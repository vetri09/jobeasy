import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

export default function useForm({ initialValues }) {
     const history = useHistory();
     const [values, setValues] = useState(initialValues || {});
     const [error, setError] = useState(null);
     //track form values
     const handle_change = event => {
     const value = event.target.value;
     const name = event.target.name;
          setValues({
               ...values,
               [name]: value
          });
     };
     // signup
     //submit form when submit button is clicked
     const handle_signup = event => {
          event.preventDefault();
          submitData({ values });
     };
     //send data to database
     const submitData = async (formValues) => {
          // const url = 'http://localhost:3001';
          const url = 'https://jobeasyapi.herokuapp.com';
          const dataObject = formValues.values;
          const { username, email, password, isRecruiter } = dataObject;
          try {
          await axios ({
          method: 'POST',
          url: `${url}/auth/signup`,
          data: {
          username: username,
          email: email,
          password: password,
          isRecruiter: isRecruiter
          },
          headers: new Headers({ 'Content-Type': 'application/json' })
          }).then(res => {
               history.push('/login');
          })
          }
          catch(err) {
               setError(err.response.data);
          }
     };
     // login
     //submit form when submit button is clicked
     const handle_login = event => {
          event.preventDefault();
          submitDataLogin({ values });
     };
     //send data to database
     const submitDataLogin = async (formValues) => {
          // const url = 'http://localhost:3001';
          const url = 'https://jobeasyapi.herokuapp.com';
          const dataObject = formValues.values;
          const { email, password } = dataObject;
          try {
          await axios ({
          method: 'POST',
          url: `${url}/auth/login`,
          data: {
          email: email,
          password: password
          },
          headers: new Headers({ 'Content-Type': 'application/json' })
          }).then(res => {
               history.push('/');
               localStorage.setItem("token", res.data.token);
               localStorage.setItem("userId", res.data.user._id);
          })
          }
          catch(err) {
               setError(err.response.data);
          }
     };
     // post
     const handle_post = event => {
          event.preventDefault();
          submitDataPost({ values });
     };
     // add post
     const submitDataPost = async (formValues) => {
          // const url = 'http://localhost:3001';
          const url = 'https://jobeasyapi.herokuapp.com';
          const dataObject = formValues.values;
          const { jobdescription, location, company, jobtitle, userId } = dataObject;
          try {
          await axios ({
          method: 'POST',
          url: `${url}/posts/add`,
          data: {
               jobdescription: jobdescription,
               location: location,
               company: company,
               jobtitle: jobtitle,
               userId: userId
          },
          headers: new Headers({ 'Content-Type': 'application/json' })
          }).then(res => {
               window.location.reload(false);
               console.log(res);
          })
          }
          catch(err) {
               setError(err.response.data);
          }
     };
     // return
     return {
     handle_change,
     values,
     handle_signup,
     handle_login,
     handle_post,
     error
     }
}
