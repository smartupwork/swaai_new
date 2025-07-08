import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
//const baseUrl = 'http://127.0.0.1:8000/';
// const baseUrl = 'https://r6u.585.mytemp.website/';
const baseUrl="https://swaai.net/"
// API Calls
export const fetchPosts = createAsyncThunk(
  'api/fetchPosts',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/posts',
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch posts');
    }
  },
);

export const fetchUsers = createAsyncThunk(
  'api/fetchUsers',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users',
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch users');
    }
  },
);

export const addPost = createAsyncThunk(
  'api/addPost',
  async (newPost, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        'https://jsonplaceholder.typicode.com/posts',
        newPost,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to add post');
    }
  },
);

export const addUser = createAsyncThunk(
  'api/addUser',
  async (newUser, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        'https://jsonplaceholder.typicode.com/users',
        newUser,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to add user');
    }
  },
);







// =======Api========

export const login = createAsyncThunk(
  'login',
  async (data, {rejectWithValue}) => {
    try {
      const response = await axios.post(`${baseUrl}api/login`, data);
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data); // Send full error response to the Redux state
      } else if (error.request) {
        return rejectWithValue('No response received from server.');
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
export const signUp = createAsyncThunk('signUp', async (data, {rejectWithValue}) => {
  try {
    const response = await axios.post(`${baseUrl}api/register`, data);
    return response.data;
  } catch (error) {
    if (error.response) {
      return rejectWithValue(error.response.data); // Send full error response to the Redux state
    } else if (error.request) {
      return rejectWithValue('No response received from server.');
    } else {
      return rejectWithValue(error.message);
    }
  }
});
export const forgotPassword = createAsyncThunk(
  'forgotPassword',
  async (data, {rejectWithValue}) => {
    try {
      const response = await axios.post(`${baseUrl}api/password/forgot`, data);
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data); // Send full error response to the Redux state
      } else if (error.request) {
        return rejectWithValue('No response received from server.');
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
export const subscriptionPlans = createAsyncThunk(
  'subscriptionPlans',
  async (_, {rejectWithValue}) => {
    try {
      // Retrieve token from AsyncStorage
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        throw new Error('Token not found');
      }

      // Axios request with headers
      const response = await axios.get(`${baseUrl}api/plans`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add Bearer token
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          'Failed to fetch subscription plans',
      );
    }
  },
);

export const categories = createAsyncThunk(
  'categories',
  async (_, {rejectWithValue}) => {
    try {
      // Retrieve token from AsyncStorage
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        throw new Error('Token not found');
      }

      // Axios request with headers
      const response = await axios.get(`${baseUrl}api/categories`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add Bearer token
        },
      });

      return response?.data?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          'Failed to fetch categories plans',
      );
    }
  },
);
export const createbusiness = createAsyncThunk(
  'createbusiness',
  async (data, {rejectWithValue}) => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        throw new Error('Token not found');
      }

      const response = await axios.post(`${baseUrl}api/createbusiness`, data, {
        headers: {
          Authorization: `Bearer ${token}`, // Add Bearer token
        },
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data); // Send full error response to the Redux state
      } else if (error.request) {
        return rejectWithValue('No response received from server.');
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const userData = createAsyncThunk(
  'userData',
  async (_, {rejectWithValue}) => {
    
    try {


  const token = await AsyncStorage.getItem('token');
        const user = await AsyncStorage.getItem('user');
 const id = JSON.parse(user);
  if (!token) {
    throw new Error('Token not found');
  }
  const response = await axios.get(`${baseUrl}api/userdata/${id?.id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });    
      
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch posts');
    }
  },
);
export const profile = createAsyncThunk('profile', async (_, {rejectWithValue}) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const user = await AsyncStorage.getItem('user');
    const id = JSON.parse(user);
    if (!token) {
      throw new Error('Token not found');
    }
    const response = await axios.get(`${baseUrl}api/profile/${id?.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response?.data;
  } catch (error) {
    return rejectWithValue(error.message || 'Failed to fetch posts');
  }
});
export const updateProfile = createAsyncThunk(
  'updateProfile',
  async (data, {rejectWithValue}) => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        throw new Error('Token not found');
      }

      const response = await axios.post(`${baseUrl}api/updateProfile`, data, {
        headers: {
          Authorization: `Bearer ${token}`, // Add Bearer token
        },
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data); // Send full error response to the Redux state
      } else if (error.request) {
        return rejectWithValue('No response received from server.');
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
export const offers = createAsyncThunk('offers', async (_, {rejectWithValue}) => {
  try {
    // Retrieve token from AsyncStorage
    const token = await AsyncStorage.getItem('token');
 const user = await AsyncStorage.getItem('user');
 const id = JSON.parse(user);
    if (!token) {
      throw new Error('Token not found');
    }
console.log(`${baseUrl}api/offers/${id?.id}`);

    // Axios request with headers
    const response = await axios.get(`${baseUrl}api/offers/${id?.id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Add Bearer token
      },
    });

    return response?.data?.data;
  } catch (error) {
    return rejectWithValue(
      error.response?.data?.message ||
        error.message ||
        'Failed to fetch categories plans',
    );
  }
});
export const saveOffers = createAsyncThunk(
  'saveOffers',
  async (data, {rejectWithValue}) => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        throw new Error('Token not found');
      }
console.log("-------",`${baseUrl}api/saveOffers`, data);

      const response = await axios.post(`${baseUrl}api/saveOffers`, data, {
        headers: {
          Authorization: `Bearer ${token}`, // Add Bearer token
        },
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data); // Send full error response to the Redux state
      } else if (error.request) {
        return rejectWithValue('No response received from server.');
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
export const getUserMedia = createAsyncThunk(
  'getUserMedia',
  async (_, {rejectWithValue}) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const user = await AsyncStorage.getItem('user');
     
      const id = JSON.parse(user);
      if (!token) {
        throw new Error('Token not found');
      }
      const response = await axios.get(
        `${baseUrl}api/get-user-media/${id.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch posts');
    }
  },
);
export const insertImage = createAsyncThunk(
  'insertImage',
  async (data, {rejectWithValue}) => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        throw new Error('Token not found');
      }

      const response = await axios.post(`${baseUrl}api/insert-image`, data, {
        headers: {
          Authorization: `Bearer ${token}`, // Add Bearer token
        },
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data); // Send full error response to the Redux state
      } else if (error.request) {
        return rejectWithValue('No response received from server.');
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
export const getCards = createAsyncThunk('getCards', async (_, {rejectWithValue}) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const user = await AsyncStorage.getItem('user');
    const id = JSON.parse(user);
    if (!token) {
      throw new Error('Token not found');
    }
    const response = await axios.get(`${baseUrl}api/get-cards/${id.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  } catch (error) {
    return rejectWithValue(error.message || 'Failed to fetch posts');
  }
});
export const addCard = createAsyncThunk('addCard', async (data, {rejectWithValue}) => {
  try {
    const token = await AsyncStorage.getItem('token');

    if (!token) {
      throw new Error('Token not found');
    }

    const response = await axios.post(`${baseUrl}api/add-card`, data, {
      headers: {
        Authorization: `Bearer ${token}`, // Add Bearer token
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      return rejectWithValue(error.response.data); // Send full error response to the Redux state
    } else if (error.request) {
      return rejectWithValue('No response received from server.');
    } else {
      return rejectWithValue(error.message);
    }
  }
});
export const makeCardDefault = createAsyncThunk(
  'makeCardDefault',
  async (data, {rejectWithValue}) => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        throw new Error('Token not found');
      }

      const response = await axios.post(
        `${baseUrl}api/make-card-default`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add Bearer token
          },
        },
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data); // Send full error response to the Redux state
      } else if (error.request) {
        return rejectWithValue('No response received from server.');
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
export const updateAddress = createAsyncThunk(
  'address/updateAddress',
  async ({id, business_address}, {rejectWithValue}) => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        throw new Error('Token not found');
      }
`${baseUrl}api/make-card-default`;
      const response = await fetch(`${baseUrl}api/updateAddress/${id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({business_address}),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update address');
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const userMeta = createAsyncThunk(
  'userMeta',
  async ({id, country, language, currency}, {rejectWithValue}) => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        throw new Error('Token not found');
      }

      const response = await axios.patch(
        `${baseUrl}api/user-meta/${id}`,
        {
          country,
          language,
          currency,
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else if (error.request) {
        return rejectWithValue('No response received from server.');
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
export const addCommunity = createAsyncThunk(
  'addCommunity',
  async (data, {rejectWithValue}) => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        throw new Error('Token not found');
      }

      const response = await axios.post(`${baseUrl}api/add-community`, data, {
        headers: {
          Authorization: `Bearer ${token}`, // Add Bearer token
        },
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data); // Send full error response to the Redux state
      } else if (error.request) {
        return rejectWithValue('No response received from server.');
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
export const getCommunities = createAsyncThunk(
  'getCommunities',
  async (_, {rejectWithValue}) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const user = await AsyncStorage.getItem('user');

      const id = JSON.parse(user);
      if (!token) {
        throw new Error('Token not found');
      }
      const response = await axios.get(
        `${baseUrl}api/get-communities/${id.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch posts');
    }
  },
);
export const addPosts = createAsyncThunk(
  'addPosts',
  async (data, {rejectWithValue}) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }

      const response = await axios.post(`${baseUrl}api/add-posts`, data, {
        headers: {
          Authorization: `Bearer ${token}`, // Add Bearer token
        },
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data); // Send full error response to the Redux state
      } else if (error.request) {
        return rejectWithValue('No response received from server.');
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
export const getPosts = createAsyncThunk(
  'getPosts',
  async (id, {rejectWithValue}) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }
      const response = await axios.get(`${baseUrl}api/get-posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch posts');
    }
  },
);
export const reactToPost = createAsyncThunk(
  'reactToPost',
  async (data, {rejectWithValue}) => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        throw new Error('Token not found');
      }

      const response = await axios.post(`${baseUrl}api/react-to-post`, data, {
        headers: {
          Authorization: `Bearer ${token}`, // Add Bearer token
        },
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data); // Send full error response to the Redux state
      } else if (error.request) {
        return rejectWithValue('No response received from server.');
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
export const getMyPosts = createAsyncThunk(
  'getMyPosts',
  async (_, {rejectWithValue}) => {
    try {
      const token = await AsyncStorage.getItem('token');

   const user = await AsyncStorage.getItem('user');

   const id = JSON.parse(user);
      if (!token) {
        throw new Error('Token not found');
      }
      const response = await axios.get(`${baseUrl}api/get-my-posts/${id?.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch posts');
    }
  },
);
export const commentInPost = createAsyncThunk(
  'commentInPost',
  async (data, {rejectWithValue}) => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        throw new Error('Token not found');
      }

      const response = await axios.post(`${baseUrl}api/comment-in-post`, data, {
        headers: {
          Authorization: `Bearer ${token}`, // Add Bearer token
        },
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data); // Send full error response to the Redux state
      } else if (error.request) {
        return rejectWithValue('No response received from server.');
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
export const postShares = createAsyncThunk(
  'postShares',
  async (data, {rejectWithValue}) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }

      const response = await axios.post(`${baseUrl}api/post-shares`, data, {
        headers: {
          Authorization: `Bearer ${token}`, // Add Bearer token
        },
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data); // Send full error response to the Redux state
      } else if (error.request) {
        return rejectWithValue('No response received from server.');
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
export const getBusiness = createAsyncThunk(
  'getBusiness',
  async (_, {rejectWithValue}) => {
    try {
      const token = await AsyncStorage.getItem('token');
            if (!token) {
        throw new Error('Token not found');
      }
      const response = await axios.get(`${baseUrl}api/get-business`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch posts');
    }
  },
);
export const getBusinessDetail = createAsyncThunk(
  'getBusinessDetail',
  async (id, {rejectWithValue}) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }
      console.log(
        'getBusinessDetail',
        `${baseUrl}api/get-business/detail/${id}`,
      );
      
      const response = await axios.get(`${baseUrl}api/get-business/detail/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(
        error.message || 'Failed to fetch getBusinessDetail',
      );
    }
  },
);

export const addReview = createAsyncThunk(
  'addReview',
  async (data, {rejectWithValue}) => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        throw new Error('Token not found');
      }

      const response = await axios.post(`${baseUrl}api/add-review`, data, {
        headers: {
          Authorization: `Bearer ${token}`, // Add Bearer token
        },
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data); // Send full error response to the Redux state
      } else if (error.request) {
        return rejectWithValue('No response received from server.');
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
export const getReview = createAsyncThunk(
  'getReview',
  async (id, {rejectWithValue}) => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        throw new Error('Token not found');
      }
      const response = await axios.get(`${baseUrl}api/get-review/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch getReview');
    }
  },
);   
export const toggleSave = createAsyncThunk(
  'toggleSave',
  async (data, {rejectWithValue}) => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        throw new Error('Token not found');
      }

      const response = await axios.post(
        `${baseUrl}api/businesses/toggle-save`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add Bearer token
          },
        },
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data); // Send full error response to the Redux state
      } else if (error.request) {
        return rejectWithValue('No response toggleSave from server.');
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
export const getSavedBusinesses = createAsyncThunk(
  'getSavedBusinesses',
  async (id, {rejectWithValue}) => {

    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        throw new Error('Token not found');
      }
      const response = await axios.get(
        `${baseUrl}api/user/saved-businesses`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch getReview');
    }
  },
);  
export const savedBusinesses = createAsyncThunk(
  'savedBusinesses',
  async (data, {rejectWithValue}) => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        throw new Error('Token not found');
      }

      const response = await axios.post(
        `${baseUrl}api/businesses/toggle-save`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add Bearer token
          },
        },
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data); // Send full error response to the Redux state
      } else if (error.request) {
        return rejectWithValue('No response received from server.');
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
export const toggleCheckIn = createAsyncThunk(
  'toggleCheckIn',
  async (data, {rejectWithValue}) => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        throw new Error('Token not found');
      }

      const response = await axios.post(
        `${baseUrl}api/businesses/toggle-check-in`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add Bearer token
          },
        },
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data); // Send full error response to the Redux state
      } else if (error.request) {
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
export const checkedIn = createAsyncThunk(
  'checkedIn',
  async (id, {rejectWithValue}) => {
  
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        throw new Error('Token not found');
      }      
      const response = await axios.get(`${baseUrl}api/businesses/checked-in`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch checked-in');
    }
  },
);
export const getConsumerProfile = createAsyncThunk(
  'getConsumerProfile',
  async (_, {rejectWithValue}) => {
    try {
   const user = await AsyncStorage.getItem('user');
   const uid = JSON.parse(user);
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }
      const response = await axios.get(`${baseUrl}api/consumer/profile/${uid.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response?.data;
    } catch (error) {
      return rejectWithValue(
        error.message || 'Failed to fetch getConsumerProfile-in',
      );
    }
  },
);
export const updateConsumerProfile = createAsyncThunk(
  'updateConsumerProfile',
  async (data, {rejectWithValue}) => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        throw new Error('Token not found');
      }

      const response = await axios.post(
        `${baseUrl}api/consumer/updateProfile`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add Bearer token
          },
        },
      );
      return response.data;
    } catch (error) {
      if (error.response) {
    
        return rejectWithValue(error.response.data); // Send full error response to the Redux state
      } else if (error.request) {
        return rejectWithValue('No response received from server.');
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
export const userConsumerMeta = createAsyncThunk(
  'userConsumerMeta',
  async (data, {rejectWithValue}) => {
 const user = await AsyncStorage.getItem('user');

 const uid = JSON.parse(user);
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        throw new Error('Token not found');
      }

      const response = await axios.patch(
        `${baseUrl}api/user-meta/${uid.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add Bearer token
          },
        },
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data); // Send full error response to the Redux state
      } else if (error.request) {
        return rejectWithValue('No response received from server.');
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
export const joinCommunity = createAsyncThunk(
  'joinCommunity',
  async (data, {rejectWithValue}) => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        throw new Error('Token not found');
      }

      const response = await axios.post(
        `${baseUrl}api/community/${data.id}/join`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add Bearer token
          },
        },
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data); // Send full error response to the Redux state
      } else if (error.request) {
        return rejectWithValue('No response received from server.');
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
export const leaveCommunity = createAsyncThunk(
  'leaveCommunity',
  async (data, {rejectWithValue}) => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        throw new Error('Token not found');
      }

      const response = await axios.post(
        `${baseUrl}api/community/${data.id}/leave`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add Bearer token
          },
        },
      );
      return response.data;
    } catch (error) {
      if (error.response) {
  return rejectWithValue(error.response.data); // Send full error response to the Redux state
      } else if (error.request) {
          return rejectWithValue('No response received from server.');
      } else {
       return rejectWithValue(error.message);
      }
    }
  },
);
export const getCommunityMembers = createAsyncThunk(
  'getCommunityMembers',
  async (id, {rejectWithValue}) => {
    try {
      const user = await AsyncStorage.getItem('user');

      const uid = JSON.parse(user);
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        throw new Error('Token not found');
      }
      const response = await axios.get(`${baseUrl}api/community/members/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(
        error.message || 'Failed to fetch getCommunityMembers-in',
      );
    }
  },
);
export const searchBusiness = createAsyncThunk(
  'searchBusiness',
  async (data, {rejectWithValue}) => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        throw new Error('Token not found');
      }

      const response = await axios.post(`${baseUrl}api/search-business`, data, {
        headers: {
          Authorization: `Bearer ${token}`, // Add Bearer token
        },
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data); // Send full error response to the Redux state
      } else if (error.request) {
        return rejectWithValue('No response received from server.');
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
export const getRecommendedBusinesses = createAsyncThunk(
  'getRecommendedBusinesses',
  async (data, {rejectWithValue}) => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        throw new Error('Token not found');
      }

      const response = await axios.post(
        `${baseUrl}api/get-recommended/businesses`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add Bearer token
          },
        },
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data); // Send full error response to the Redux state
      } else if (error.request) {
        return rejectWithValue('No response received from server.');
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
export const getChatList = createAsyncThunk(
  'getChatList',
  async (_, {rejectWithValue}) => {
    try {
      const user = await AsyncStorage.getItem('user');

      const uid = JSON.parse(user);
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        throw new Error('Token not found');
      }
      const response = await axios.get(
        `${baseUrl}api/chats`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(
        error.message || 'Failed to fetch getCommunityMembers-in',
      );
    }
  },
);
export const getChatByUserId = createAsyncThunk(
  'getChatByUserId',
  async (id, {rejectWithValue}) => {
    try {
      // Retrieve user and token from AsyncStorage
      const user = await AsyncStorage.getItem('user');
      const token = await AsyncStorage.getItem('token');

      // Parse user data
      const uid = JSON.parse(user);

      // Check if token and user ID are available
      if (!token) {
        throw new Error('Token not found');
      }
      if (!uid?.id) {
        throw new Error('User ID not found');
      }

   
      // Make API request
      const response = await axios.get(`${baseUrl}api/chat/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Log API response for debugging
      console.log('API Response:', response.data);

      // Return the data
      return response.data;
    } catch (error) {
      // Log detailed error message
      console.error('Error in getChatByUserId:', error);

      // Return error message for rejection
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          'Failed to fetch chat data',
      );
    }
  },
);
export const readChat = createAsyncThunk(
  'readChat',
  async (_, {rejectWithValue}) => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        throw new Error('Token not found');
      }

      const response = await axios.post(`${baseUrl}api/chat/read/2`, _, {
        headers: {
          Authorization: `Bearer ${token}`, // Add Bearer token
        },
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data); // Send full error response to the Redux state
      } else if (error.request) {
        return rejectWithValue('No response received from server.');
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
export const saveChat = createAsyncThunk(
  'saveChat',
  async (data, {rejectWithValue}) => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        throw new Error('Token not found');
      }

      const response = await axios.post(`${baseUrl}api/chat/send`, data, {
        headers: {
          Authorization: `Bearer ${token}`, // Add Bearer token
        },
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data); // Send full error response to the Redux state
      } else if (error.request) {
        return rejectWithValue('No response received from server.');
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
export const availOffer = createAsyncThunk(
  'availOffer',
  async (id, {rejectWithValue}) => {
    try {
      // Retrieve user and token from AsyncStorage
      const user = await AsyncStorage.getItem('user');
      const token = await AsyncStorage.getItem('token');

      // Parse user data
      const uid = JSON.parse(user);

      // Check if token and user ID are available
      if (!token) {
        throw new Error('Token not found');
      }
      if (!uid?.id) {
        throw new Error('User ID not found');
      }
console.log("availOffer id",`${baseUrl}api/avail/offer/${id}`);

      // Make API request
      const response = await axios.get(`${baseUrl}api/avail/offer/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Log API response for debugging
      console.log('API Response: availOffer', response.data);

      // Return the data
      return response.data;
    } catch (error) {
      // Log detailed error message
      console.error('Error in availOffer:', error);

      // Return error message for rejection
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          'Failed to fetch chat data',
      );
    }
  },
);
export const saveAnalytics = createAsyncThunk(
  'saveAnalytics',
  async (data, {rejectWithValue}) => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        throw new Error('Token not found');
      }

      const response = await axios.post(
        `${baseUrl}api/businesses/save-analytics`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add Bearer token
          },
        },
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data); // Send full error response to the Redux state
      } else if (error.request) {
        return rejectWithValue('No response received from server.');
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
export const getAnalytics = createAsyncThunk(
  'getAnalytics',
  async (business_id, {rejectWithValue}) => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        throw new Error('Token not found');
      }
console.log(token);

      const response = await axios.get(
        `${baseUrl}api/businesses/get-analytics/${business_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add Bearer token
          },
        },
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data); // Send full error response to the Redux state
      } else if (error.request) {
        return rejectWithValue('No response received from server.');
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
export const filterAnalytics = createAsyncThunk(
  'filterAnalytics',
  async (data, {rejectWithValue}) => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        throw new Error('Token not found');
      }
console.log(token);
console.log("filter data ",data);

      const response = await axios.get(
        `${baseUrl}api/business/filter-analytics/${data?.business_id}?filter=${data?.days}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add Bearer token
          },
        },
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data); // Send full error response to the Redux state
      } else if (error.request) {
        return rejectWithValue('No response received from server.');
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
export const calculateImpact = createAsyncThunk(
  'calculateImpact',
  async (_, {rejectWithValue}) => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        throw new Error('Token not found');
      }
      console.log(token);

      const response = await axios.get(
        `${baseUrl}api/consumer/calculate-impact`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add Bearer token
          },
        },
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data); // Send full error response to the Redux state
      } else if (error.request) {
        return rejectWithValue('No response received from server.');
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
// Slice
const apiSlice = createSlice({
  name: 'api',
  initialState: {
    posts: [],
    users: [],
    plans: [], 
    community:[],
    posts:[],
    myPosts:[],
    bussiness:[],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    // Fetch Posts
    builder
      .addCase(fetchPosts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.plans = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch Users
    builder
      .addCase(fetchUsers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Add Post
    builder
      .addCase(addPost.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPost.fulfilled, state => {
        state.loading = false;
      })
      .addCase(addPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Add User
    builder
      .addCase(addUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, state => {
        state.loading = false;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // login builder
    builder
      .addCase(login.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, state => {
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // register builder
    builder
      .addCase(signUp.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, state => {
        state.loading = false;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // forgot builder
    builder
      .addCase(forgotPassword.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, state => {
        state.loading = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    //  subscriptionPlans
    builder
      .addCase(subscriptionPlans.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(subscriptionPlans.fulfilled, (state, action) => {
        state.loading = false;
        state.plans = action.payload;
      })
      .addCase(subscriptionPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    //  categories
    builder
      .addCase(categories.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(categories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(categories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // createbusiness builder
    builder
      .addCase(createbusiness.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createbusiness.fulfilled, state => {
        state.loading = false;
      })
      .addCase(createbusiness.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // Fetch userData
    builder
      .addCase(userData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userData.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
      })
      .addCase(userData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // Fetch profile
    builder
      .addCase(profile.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(profile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(profile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // updateProfile builder
    builder
      .addCase(updateProfile.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, state => {
        state.loading = false;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    //  offers
    builder
      .addCase(offers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(offers.fulfilled, (state, action) => {
        state.loading = false;
        state.offers = action.payload;
      })
      .addCase(offers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // saveOffers builder
    builder
      .addCase(saveOffers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveOffers.fulfilled, state => {
        state.loading = false;
      })
      .addCase(saveOffers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // getUserMedia
    builder
      .addCase(getUserMedia.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserMedia.fulfilled, state => {
        state.loading = false;
      })
      .addCase(getUserMedia.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // insertImage builder
    builder
      .addCase(insertImage.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(insertImage.fulfilled, state => {
        state.loading = false;
      })
      .addCase(insertImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // getCards
    builder
      .addCase(getCards.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCards.fulfilled, state => {
        state.loading = false;
      })
      .addCase(getCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // addCard builder
    builder
      .addCase(addCard.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCard.fulfilled, state => {
        state.loading = false;
      })
      .addCase(addCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // makeCardDefault builder
    builder
      .addCase(makeCardDefault.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(makeCardDefault.fulfilled, state => {
        state.loading = false;
      })
      .addCase(makeCardDefault.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // updateAddress builder
    builder
      .addCase(updateAddress.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAddress.fulfilled, state => {
        state.loading = false;
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // userMeta builder
    builder
      .addCase(userMeta.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userMeta.fulfilled, state => {
        state.loading = false;
      })
      .addCase(userMeta.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // addCommunity builder
    builder
      .addCase(addCommunity.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCommunity.fulfilled, state => {
        state.loading = false;
      })
      .addCase(addCommunity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // getCommunities
    builder
      .addCase(getCommunities.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCommunities.fulfilled, (state, action) => {
        state.loading = false;
        state.community = action.payload;
      })
      .addCase(getCommunities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // addPosts builder
    builder
      .addCase(addPosts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPosts.fulfilled, state => {
        state.loading = false;
      })
      .addCase(addPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // getPosts
    builder
      .addCase(getPosts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // reactToPost builder
    builder
      .addCase(reactToPost.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(reactToPost.fulfilled, state => {
        state.loading = false;
      })
      .addCase(reactToPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // getMyPosts
    builder
      .addCase(getMyPosts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.myPosts = action.payload;
      })
      .addCase(getMyPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // commentInPost builder
    builder
      .addCase(commentInPost.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(commentInPost.fulfilled, state => {
        state.loading = false;
      })
      .addCase(commentInPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // postShares builder
    builder
      .addCase(postShares.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postShares.fulfilled, state => {
        state.loading = false;
      })
      .addCase(postShares.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // getBusiness
    builder
      .addCase(getBusiness.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBusiness.fulfilled, (state, action) => {
        state.loading = false;
        state.bussiness = action.payload;
      })
      .addCase(getBusiness.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // getBusinessDetail
    builder
      .addCase(getBusinessDetail.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBusinessDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.bussiness = action.payload;
      })
      .addCase(getBusinessDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // addReview
    builder
      .addCase(addReview.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.loading = false;
        // state.bussiness = action.payload;
      })
      .addCase(addReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // getReview
    builder
      .addCase(getReview.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReview.fulfilled, (state, action) => {
        state.loading = false;
        // state.bussiness = action.payload;
      })
      .addCase(getReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // addReview
    builder
      .addCase(toggleSave.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleSave.fulfilled, (state, action) => {
        state.loading = false;
        // state.bussiness = action.payload;
      })
      .addCase(toggleSave.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // getSavedBusinesses
    builder
      .addCase(getSavedBusinesses.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSavedBusinesses.fulfilled, (state, action) => {
        state.loading = false;
        // state.bussiness = action.payload;
      })
      .addCase(getSavedBusinesses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // savedBusinesses
    builder
      .addCase(savedBusinesses.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(savedBusinesses.fulfilled, (state, action) => {
        state.loading = false;
        // state.bussiness = action.payload;
      })
      .addCase(savedBusinesses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // toggleCheckIn
    builder
      .addCase(toggleCheckIn.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleCheckIn.fulfilled, (state, action) => {
        state.loading = false;
        // state.bussiness = action.payload;
      })
      .addCase(toggleCheckIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    checkedIn;
    // checkedIn
    builder
      .addCase(checkedIn.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkedIn.fulfilled, (state, action) => {
        state.loading = false;
        // state.bussiness = action.payload;
      })
      .addCase(checkedIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // getConsumerProfile
    builder
      .addCase(getConsumerProfile.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getConsumerProfile.fulfilled, (state, action) => {
        state.loading = false;
        // state.bussiness = action.payload;
      })
      .addCase(getConsumerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // updateConsumerProfile
    builder
      .addCase(updateConsumerProfile.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateConsumerProfile.fulfilled, (state, action) => {
        state.loading = false;
        // state.bussiness = action.payload;
      })
      .addCase(updateConsumerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // userConsumerMeta
    builder
      .addCase(userConsumerMeta.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userConsumerMeta.fulfilled, (state, action) => {
        state.loading = false;
        // state.bussiness = action.payload;
      })
      .addCase(userConsumerMeta.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // joinCommunity
    builder
      .addCase(joinCommunity.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(joinCommunity.fulfilled, (state, action) => {
        state.loading = false;
        // state.bussiness = action.payload;
      })
      .addCase(joinCommunity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // leaveCommunity
    builder
      .addCase(leaveCommunity.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(leaveCommunity.fulfilled, (state, action) => {
        state.loading = false;
        // state.bussiness = action.payload;
      })
      .addCase(leaveCommunity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // getCommunityMembers
    builder
      .addCase(getCommunityMembers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCommunityMembers.fulfilled, (state, action) => {
        state.loading = false;
        // state.bussiness = action.payload;
      })
      .addCase(getCommunityMembers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // searchBusiness
    builder
      .addCase(searchBusiness.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchBusiness.fulfilled, (state, action) => {
        state.loading = false;
        // state.bussiness = action.payload;
      })
      .addCase(searchBusiness.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // getRecommendedBusinesses
    builder
      .addCase(getRecommendedBusinesses.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRecommendedBusinesses.fulfilled, (state, action) => {
        state.loading = false;
        // state.bussiness = action.payload;
      })
      .addCase(getRecommendedBusinesses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // getChatList
    builder
      .addCase(getChatList.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getChatList.fulfilled, (state, action) => {
        state.loading = false;
        // state.bussiness = action.payload;
      })
      .addCase(getChatList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    //getChatByUserId
    builder
      .addCase(getChatByUserId.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getChatByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.chatData = action.payload; // Store the fetched chat data
      })
      .addCase(getChatByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Store the error message
      });
    //readChat
    builder
      .addCase(readChat.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(readChat.fulfilled, (state, action) => {
        state.loading = false;
        state.chatData = action.payload; // Store the fetched chat data
      })
      .addCase(readChat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Store the error message
      });
    //saveChat
    builder
      .addCase(saveChat.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveChat.fulfilled, (state, action) => {
        state.loading = false;
        state.chatData = action.payload; // Store the fetched chat data
      })
      .addCase(saveChat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Store the error message
      });
    //availOffer
    builder
      .addCase(availOffer.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(availOffer.fulfilled, (state, action) => {
        state.loading = false;
        state.chatData = action.payload; // Store the fetched chat data
      })
      .addCase(availOffer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Store the error message
      });
    // saveAnalytics
    builder
      .addCase(saveAnalytics.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.chatData = action.payload; // Store the fetched chat data
      })
      .addCase(saveAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Store the error message
      });
    // getAnalytics
    builder
      .addCase(getAnalytics.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.chatData = action.payload; // Store the fetched chat data
      })
      .addCase(getAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Store the error message
      });
    // filterAnalytics
    builder
      .addCase(filterAnalytics.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(filterAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        // state.chatData = action.payload; // Store the fetched chat data
      })
      .addCase(filterAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Store the error message
      });
    // calculateImpact
    builder
      .addCase(calculateImpact.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(calculateImpact.fulfilled, (state, action) => {
        state.loading = false;
        // state.chatData = action.payload; // Store the fetched chat data
      })
      .addCase(calculateImpact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Store the error message
      });
  },
});

export default apiSlice.reducer;
