"use client";

import { useRouter } from 'next/navigation'
import React, { useState } from "react";
import Link from "next/link";

import { useDispatch } from 'react-redux';

import Spinner from '../Spinner.jsx';
import "../../page.css";
import styles from './styles.module.css'

import { SignupSubmit, SigninSubmit } from "../../server/signup.js";
import { authFailure, authStart, signInSuccess, signUpSuccess } from '@/app/redux/user/userSlice.js';

const Signup = () => {

  const router = useRouter()

  
  const [toggle, setToggle] = useState(false);
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [avatarImage, setAvatarImage] = useState("")
  const [statusMsg, setStatusMsg] = useState("")
  const [loading, setLoading] = useState(false)

  const loadingSpinner = <><Spinner/><span>Loading...</span></>

  const dispatch = useDispatch()

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <form encType="multipart/form-data"
          onSubmit={async(e)=>{
            e.preventDefault()
            // yaha try catch lgana h agar koi field nhi mila ya fir image nhi mila to
            try {
              dispatch(authStart())
              setLoading(true)
              await SignupSubmit(username, fullName, email, avatarImage, password);
              setStatusMsg(`You have been registered successfully. Sign in using your credentials`)
              dispatch(signUpSuccess())
            } catch (error) {
              dispatch(authFailure(error.message))
              setStatusMsg(`User registration failed!! ${error}`)
            }
            setLoading(false)
          }}

          className={`${styles.form} ${styles.signup} ${toggle ? styles.show : styles.hidden}`}>
          <h1>Sign Up</h1>
          <p>Create your brand new account</p>
          <div className={styles.input}>
            <input
              type="text"
              value={username}
              placeholder="Username"
              id="username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <input 
              type="text"
              value={fullName}
              placeholder="Full Name"
              id="fullName"
              onChange={(e)=>{
                setFullName(e.target.value)
              }}  
            />
            <input 
                type="text" 
                value={email} 
                placeholder="Email" 
                id="email" 
                onChange={(e)=>{
                    setEmail(e.target.value)
                }}
            />
            <input type="file" name="avatarImage" id="avatarImage"
              onChange={(e)=>{
                setAvatarImage(e.target.files[0])
              }}
            />
            <input
              type="password"
              value={password}
              placeholder="password"
              id="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <span>
            {statusMsg}
          </span>
          <button className={`btn ${styles.btn2}`}>
            {loading ? loadingSpinner : 'Sign Up'}
          </button>
        </form>
        <form encType="application/json"
          onSubmit={async(e)=>{
            e.preventDefault()
            // yaha try catch lgana h agar koi field nhi mila ya fir image nhi mila to
            try {
              dispatch(authStart())
              setLoading(true)
              const currentUser = await SigninSubmit(email, password);
              dispatch(signInSuccess(currentUser))
              setStatusMsg(`Login Successfull`)
              // console.log(document.cookie)
              router.replace(`http://localhost:3000/`)
            } 
            catch (error) {
              dispatch(authFailure(error.message))
                setStatusMsg(`User login failed!! ${error}`)
            }
            setLoading(false)
          }}
          className={`${styles.form} ${styles.signin} ${!toggle ? styles.show : styles.hidden}`}
          action=""
          >
          <h1>Sign In</h1>
          <p>Sign in using your email and password</p>
          <div className={styles.input}>
            <input 
                type="text" 
                value={email} 
                placeholder="Email" 
                id="email" 
                onChange={(e)=>{
                    setEmail(e.target.value)
                }}
            />
            <input
              type="password"
              value={password}
              placeholder="password"
              id="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <span>
              {statusMsg}
            </span>
            <span>
              Forget Your Password? 
              <Link href={"/users/signup"}> Click Here</Link>
            </span>
          </div>
          <button className={`btn ${styles.btn2}`}>
            {loading ? loadingSpinner : 'Sign In'}
          </button>
        </form>
        <div className={`${styles.welcome} ${styles.signup} ${toggle ? styles.show : styles.hidden}`}>
          <h1>Welcome Back!</h1>
          <p>Use your email and password to login</p>
          <button className={`btn ${styles.btn2}`}
            onClick={() => {
              setToggle(false);
            }}
          >
            Sign In
          </button>
        </div>
        <div className={`${styles.welcome} ${styles.signin} ${!toggle ? styles.show : styles.hidden}`}>
          <h1>Hello, Friend!</h1>
          <p>Register with your personal details to use all of site features</p>
          <button className={`btn ${styles.btn2}`}
            onClick={() => {
              setToggle(true);
            }}
          >
            Sign Up
          </button>
        </div>
      </div>
    </main>
  );
};

export default Signup;