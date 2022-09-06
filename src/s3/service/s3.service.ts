import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { EcommerceGlobalConfig } from '../../config/ecommerce-global.config';
import * as AWS from 'aws-sdk';
import { createContextWinston } from '../../utils/logger';

@Injectable()
export class S3Service {
  constructor(
    private readonly _ecommerceGlobalConfig: EcommerceGlobalConfig,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async uploadFile(file: Express.Multer.File, path: string, name = null) {
    const context = createContextWinston(
      this.constructor.name,
      this.uploadFile.name,
    );

    const bucketName = this._ecommerceGlobalConfig.s3Config.wsBucketName;
    const accessKeyId = this._ecommerceGlobalConfig.s3Config.wsAccessKeyid;
    const secretAccessKey =
      this._ecommerceGlobalConfig.s3Config.wsSecretAccessKey;

    let uploadFile;
    try {
      this.logger.debug('Intentando  subir archivo', {
        ...context,
      });
      const wasabiEndpoint = new AWS.Endpoint(
        this._ecommerceGlobalConfig.s3Config.wsEndpoint,
      );
      const s3 = new AWS.S3({
        endpoint: wasabiEndpoint,
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
        httpOptions: {
          connectTimeout: 2400000,
          timeout: 2400000,
        },
      });

      const splitName = file.originalname.split('.');

      const nameImage = name ? `${name}.jpg` : `${splitName[0]}.jpg`;

      const params = {
        Bucket: bucketName,
        Key: `${path}/${nameImage}`,
        Body: file.buffer,
      };

      const options = {
        partSize: 10 * 1024 * 1024, // 10 MB
        queueSize: 10,
      };

      uploadFile = await s3.upload(params, options).promise();
    } catch (error) {
      this.logger.error('error al subir archivo', {
        ...context,
        error: error.message,
      });
      throw new InternalServerErrorException(error.message);
    }
    uploadFile.mimeType = file.mimetype;
    return uploadFile;
  }

  async getFile(keyFile: string, mimeType: string) {
    const wasabiEndpoint = new AWS.Endpoint(
      this._ecommerceGlobalConfig.s3Config.wsEndpoint,
    );
    const bucketName = this._ecommerceGlobalConfig.s3Config.wsBucketName;
    const accessKeyId = this._ecommerceGlobalConfig.s3Config.wsAccessKeyid;
    const secretAccessKey =
      this._ecommerceGlobalConfig.s3Config.wsSecretAccessKey;
    let file;
    let result;
    const params = {
      Bucket: bucketName,
      Key: keyFile,
    };
    const s3 = new AWS.S3({
      endpoint: wasabiEndpoint,
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
      httpOptions: {
        connectTimeout: 2400000,
        timeout: 2400000,
      },
    });
    try {
      result = await s3.getObject(params).promise();
    } catch (error) {
      result = undefined;
    }

    if (result) {
      switch (mimeType) {
        case 'image/jpeg':
          file = `data:image/jpeg;base64,${result.Body.toString('base64')}`;
          break;
        case 'image/svg+xml':
          file = `data:image/svg+xml;base64,${result.Body.toString('base64')}`;
          break;
        case 'image/png':
          file = `data:image/jpeg;base64,${result.Body.toString('base64')}`;
          break;
        case 'application/pdf':
          file = `data:application/pdf;base64,${result.Body.toString(
            'base64',
          )}`;
          break;

        default:
          file = result.Body.toString('utf-8');
          break;
      }
    } else {
      file: null;
    }

    return { file };
  }

  async getFileUrl(keyFile: string) {
    const wasabiEndpoint = new AWS.Endpoint(
      this._ecommerceGlobalConfig.s3Config.wsEndpoint,
    );
    const bucketName = this._ecommerceGlobalConfig.s3Config.wsBucketName;
    const accessKeyId = this._ecommerceGlobalConfig.s3Config.wsAccessKeyid;
    const secretAccessKey =
      this._ecommerceGlobalConfig.s3Config.wsSecretAccessKey;
    let result;
    const signedUrlExpireSeconds = 60 * 5;
    const params = {
      Bucket: bucketName,
      Key: keyFile,
      Expires: signedUrlExpireSeconds,
    };
    const s3 = new AWS.S3({
      endpoint: wasabiEndpoint,
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
      httpOptions: {
        connectTimeout: 2400000,
        timeout: 2400000,
      },
    });
    try {
      result = await s3.getSignedUrl('getObject', params);
    } catch (error) {
      result = undefined;
    }

    return result;
  }
}
