import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyCWTxkgcyJrqzabhi5TjKfFD8Sr02XZl-Q",
  authDomain: "socialex-85cb3.firebaseapp.com",
  projectId: "socialex-85cb3",
  storageBucket: "socialex-85cb3.appspot.com",
  messagingSenderId: "682531867137",
  appId: "1:682531867137:web:b9e07d8af4bcad5ba64e00"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);  // Make sure 'storage' is initialized with the app instance

// Export the storage object for use in other files
export { storage }; // This line exports storage
