export const mockUserAuth = {
  _id: '63125ff6d8f873ce9b8c8dc1',
  first_name: 'string1',
  last_name: 'string1',
  password: '$2b$10$1WZ9bM1S.MfPA3Hjaq1ZUOLo8fNzjRahQvG6Z3bYfUTytkliKYzmW',
};

export const mockUserCredentials = {
  email: 'prueba@gmail.com',
  password: 'string',
};

export const mockUserAuthResponse = {
  access_token:
    '737979811ea3c207719093f0cd4d8d6a3bb42cefce48e98c5ea7b2762cb236ed6b493bae0873a4d1aea604e25a46dc014a7ec95156d4f53ba81b23d0418821fe4c8af3cbbbfe431776d8411fd276e608ad765597a2066dcff4df3aa18d76bce726ac625cf9fb5da494e1ba59117f52f08b81c1c209067683f39309e29ab05f185d5083b601b038776f93778ecd99e834c856d8b223eba11b3c6d7bdbebf9ba49b0bc78dde8bc8bc11ea684fca20a43eca51342e7576e316f7c2009c2eced175acacb69d95efb249bec416a9085d8a321ca9b5fa68be81759c20e21931b26ef4a59f1df9765e4b51cee46820c23fdbefd7462a6332d61b5d024c0bd65bafebc81cef3ca8715a8147faaaac3ab',
  verifyAccount: false,
};

export const mockVerificationData = {
  _id: '63142e723d01c43c17033fb6',
  token: '0093bde2-a46f-408d-af90-2a290ad939e1',
  token_expiration_date: '2022-09-05T05:04:54.467Z',
  user: '63142e723d01c43c17033fb4',
  __v: 0,
};

export const mockVerificationDataFindOne = {
  ...mockVerificationData,
  is_valid: true,
};

export const mockVerificationDataFindOneAndUpdate = {
  ...mockVerificationData,
  is_valid: false,
  verfication_date: '2022-09-04T05:10:30.571Z',
};

export const mockVerficationUDataUserFindAndUpdate = {
  _id: '63142e723d01c43c17033fb4',
  first_name: 'Osmín',
  last_name: 'López',
  email: 'mail4@domain.com',
  preferred_currency: 'USD',
  active: true,
  newsletter: false,
  verifyAccount: true,
  country: '631203e9d75a73ce254fda1a',
  __v: 0,
};
