import axios from 'axios';
import React from 'react';

export async function sendFilterRequest(rentals, keyword) {
    try {
      const url = new URL('http://backend-driving.partnastudio.com/get_popular_ranking');
      const data = {
        rentals, 
        keyword
      };
      try {
        const response = await axios.post(url, data);
        console.log("Response Data:", response.data); // Log successful response
        if (response.status === 200) {
            return response.data;
          } else {
            throw new Error('Request failed');
          }
      } catch (error) {
        console.error("Failed to fetch data:", error.response); // Log error details
      }
  
      
    } catch (error) {
      throw error;
    }
  }

  