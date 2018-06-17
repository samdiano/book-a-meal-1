import jwt from 'jsonwebtoken';

export const initialValues = {
  auth: {
    isAuthenticated: true,
    error: null,
    user: { firstname: 'Dave', lastname: 'Smith' },
    loading: false
  },
  router: {
    location: {
      pathname: '/home'
    }
  },
  meals: {
    items: [],
    working: false,
    error: null
  },
  menu: {
    meals: [],
    working: false,
    error: null,
    currentDay: '1970-01-01'
  },
  orders: {
    items: [],
    pendingOrders: 0,
    totalCashEarned: 0,
    delivering: false,
    error: null
  },
  uploadImage: {
    uploadTask: null,
    uploading: false,
    error: null,
    url: null
  },
  isFetching: false,
  ui: {
    modals: {
      open: false,
      type: null
    }
  }
};

export const caterer = {
  id: 'a09a5570-a3b2-4e21-94c3-5cf483dbd1ac',
  businessName: 'Food Circle',
  businessPhoneNo: '+2348166557788',
  businessAddress: '$, Herbert Macaulay Way, Yaba, Lagos',
  role: 'caterer',
  email: 'food@circle.com'
};

export const customer = {
  id: 'a09a5570-a3b2-4e21-94c3-5cf483dbd1ac',
  firstname: 'Emiola',
  lastname: 'Olasanmi',
  role: 'customer',
  email: 'emiola@olasanmi.com',
};

export const newCustomer = {
  role: 'customer',
  firstname: 'Jane',
  lastname: 'Smithy',
  email: 'janesmithy@gmail.com',
  password: 'janesmithy',
  passwordConfirm: 'janesmithy',
};

export const customerToken = `Bearer ${jwt.sign({
  id: 'a09a5570-a3b2-4e21-94c3-5cf483dbd1ac',
  email: 'emiola@olasanmi.com',
  role: 'customer',
}, process.env.SECRET, { expiresIn: '1 hour' })}`;

export const catererToken = `Bearer ${jwt.sign({
  id: '8356954a-9a42-4616-8079-887a73455a7f',
  email: 'food@circle.com',
  role: 'caterer',
}, process.env.SECRET, { expiresIn: '1 hour' })}`;

export const expiredToken = `Bearer ${jwt.sign({
  id: '8356954a-9a42-4616-8079-887a73455a7f',
  email: 'food@circle.com',
  role: 'caterer',
}, process.env.SECRET, { expiresIn: -1 })}`;

export const caterersOrdersObj = {
  orders: [
    {
      id: 'fb097bde-5959-45ff-8e21-51184fa60c25',
      deliveryAddress: '4, Church Street, Yaba',
      deliveryPhoneNo: '+2348134567890',
      status: 'delivered',
      createdAt: '2018-04-06T00:47:03.687Z',
      updatedAt: '2018-04-06T00:47:03.687Z',
      customer: {
        firstname: 'Emiola',
        lastname: 'Olasanmi',
        email: 'emiola@olasanmi.com'
      },
      meals: [
        {
          id: '36d525d1-efc9-4b75-9999-3e3d8dc64ce3',
          title: 'Vegetable Sharwama and Guava Smoothie',
          imageURL: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&h=350',
          description: 'Sharwama contains no animal products, perfect for dieters',
          vegetarian: true,
          price: '1200.00',
          quantity: 1,
          delivered: true
        }
      ]
    },
    {
      id: 'ce228787-f939-40a0-bfd3-6607ca8d2e53',
      deliveryAddress: '4, Church Street, Yaba',
      deliveryPhoneNo: '+2348134567890',
      status: 'delivered',
      createdAt: '2018-05-01T00:47:03.687Z',
      updatedAt: '2018-05-01T00:47:03.687Z',
      customer: {
        firstname: 'Olisa',
        lastname: 'Emodi',
        email: 'olisa@emodi.com'
      },
      meals: [
        {
          id: 'baa0412a-d167-4d2b-b1d8-404cb8f02631',
          title: 'Semo/Wheat and Egusi Soup',
          imageURL: 'https://static.pulse.ng/img/incoming/origs7167742/5270485143-w980-h640/Pounded-yam-and-Egusi-soup.jpg',
          description: 'Meal contains 2 pieces of beef and other assorted meat and fish products',
          vegetarian: false,
          price: '2000.00',
          quantity: 2,
          delivered: true
        },
        {
          id: 'a3c35e8f-da7a-4113-aa01-a9c0fc088539',
          title: 'Eba and Ogbono Soup',
          imageURL: 'http://www.kalakutahgrills.com/wp-content/uploads/2017/02/my-pics-group-3-007.jpg',
          description: 'Meal contains 2 pieces of beef and other assorted meat and fish products',
          vegetarian: false,
          price: '2000.00',
          quantity: 2,
          delivered: true
        }
      ]
    },
    {
      id: 'fb097bde-5959-45ff-8e21-51184fa60c26',
      deliveryAddress: '4, Church Street, Yaba',
      deliveryPhoneNo: '+2348134567890',
      status: 'pending',
      createdAt: '2018-05-29T00:47:03.687Z',
      updatedAt: '2018-05-29T00:47:03.687Z',
      customer: {
        firstname: 'Emiola',
        lastname: 'Olasanmi',
        email: 'emiola@olasanmi.com'
      },
      meals: [
        {
          id: '36d525d1-efc9-4b75-9999-3e3d8dc64ce3',
          title: 'Vegetable Sharwama and Guava Smoothie',
          imageURL: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&h=350',
          description: 'Sharwama contains no animal products, perfect for dieters',
          vegetarian: true,
          price: '1200.00',
          quantity: 1,
          delivered: false
        }
      ]
    },
    {
      id: 'fb097bde-5959-45ff-8e21-51184fa60c35',
      deliveryAddress: '4, Church Street, Yaba',
      deliveryPhoneNo: '+2348134567890',
      status: 'canceled',
      createdAt: '2018-05-27T00:47:03.687Z',
      updatedAt: '2018-05-27T00:47:03.687Z',
      customer: {
        firstname: 'Emiola',
        lastname: 'Olasanmi',
        email: 'emiola@olasanmi.com'
      },
      meals: [
        {
          id: '36d525d1-efc9-4b75-9999-3e3d8dc64ce3',
          title: 'Vegetable Sharwama and Guava Smoothie',
          imageURL: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&h=350',
          description: 'Sharwama contains no animal products, perfect for dieters',
          vegetarian: true,
          price: '1200.00',
          quantity: 1,
          delivered: false
        }
      ]
    },
  ],
  totalCashEarned: 9200,
  pendingOrders: 0
};

export const caterersOrdersObjPerDay = {
  orders: [
    {
      id: 'fb097bde-5959-45ff-8e21-51184fa60c35',
      deliveryAddress: '4, Church Street, Yaba',
      deliveryPhoneNo: '+2348134567890',
      status: 'delivered',
      createdAt: '2018-05-27T00:47:03.687Z',
      updatedAt: '2018-05-27T00:47:03.687Z',
      customer: {
        firstname: 'Emiola',
        lastname: 'Olasanmi',
        email: 'emiola@olasanmi.com'
      },
      meals: [
        {
          id: '36d525d1-efc9-4b75-9999-3e3d8dc64ce3',
          title: 'Vegetable Sharwama and Guava Smoothie',
          imageURL: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&h=350',
          description: 'Sharwama contains no animal products, perfect for dieters',
          vegetarian: true,
          price: '1200.00',
          quantity: 1,
          delivered: true
        }
      ]
    },
  ],
  totalCashEarned: 1200,
  pendingOrders: 0
};

export const deliverOrder = {
  id: 'fb097bde-5959-45ff-8e21-51184fa60c26',
  deliveryAddress: '4, Church Street, Yaba',
  deliveryPhoneNo: '+2348134567890',
  status: 'delivered',
  createdAt: '2018-05-29T00:47:03.687Z',
  updatedAt: '2018-05-29T00:47:03.687Z',
  customer: {
    firstname: 'Emiola',
    lastname: 'Olasanmi',
    email: 'emiola@olasanmi.com'
  },
  meals: [
    {
      id: '36d525d1-efc9-4b75-9999-3e3d8dc64ce3',
      title: 'Vegetable Sharwama and Guava Smoothie',
      imageURL: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&h=350',
      description: 'Sharwama contains no animal products, perfect for dieters',
      vegetarian: true,
      price: '1200.00',
      quantity: 1,
      delivered: true
    }
  ]
};

export const caterersMealsObj = {
  meals: [
    {
      id: '81211c24-51c0-46ec-b1e0-18db55880958',
      title: 'Jollof Rice, Beef and Plantain',
      imageURL: 'http://www.preciouscore.com/wp-content/uploads/2017/11/How-to-cook-jollof-rice-in-the-oven-750x500.jpg',
      description: 'Jollof Rice, Beef and Plantain. 2 pieces of beef per plate',
      vegetarian: false,
      price: '1500.00'
    },
    {
      id: '36d525d1-efc9-4b75-9999-3e3d8dc64ce3',
      title: 'Vegetable Sharwama and Guava Smoothie',
      imageURL: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&h=350',
      description: 'Sharwama contains no animal products, perfect for dieters',
      vegetarian: true,
      price: '1200.00'
    }
  ]
};

export const newMeal = {
  id: '81211c24-51c0-46ec-b1e0-18db55880954',
  title: 'Jollof Rice and Chicken',
  imageURL: 'http://www.preciouscore.com/wp-content/uploads/2017/11/How-to-cook-jollof-rice-in-the-oven-750x500.jpg',
  description: '',
  vegetarian: false,
  price: '2500.00'
};