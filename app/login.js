// all the phone auth login code
// later we will import this to page file

"use client"
import React,{ useEffect, useState } from "react";
import { RecaptchaVerifier, getAuth, signInWithPhoneNumber } from "firebase/auth";
import { app } from './config'
import { useRouter } from "next/navigation";

function Login() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [confirmationResult, setconfirmationResult] = useState(null);
    const [otpSent, setotpSent] = useState(false);

    const auth = getAuth(app);
    const router = useRouter();

    useEffect(() => {
        window.recaptchaVerifier = new RecaptchaVerifier(auth,
            'recaptcha-container',
            {
                size: "normal",
                callback: response => {
                    // reCAPTCHA solved, allow signInWithPhoneNumber.
                    // ...
                    this.setState({ isButtonDisabled: false });
                },                
            }

        )
    }, [auth]);

    const handelPhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
    }
    const handelOTPChange = (e) => {
        setOtp(e.target.value);
    }

    const handelSendOtp = async () => {
        try {
            const formattedPhoneNumber = `+${phoneNumber.replace(/\D/g, '')}`;
            const confirmation = await signInWithPhoneNumber(auth, formattedPhoneNumber, window.recaptchaVerifier);

            setconfirmationResult(confirmation);
            setotpSent(true);
            setPhoneNumber('');
            alert('OTP has been sent');

        } catch (error) {
            console.log(error);
            console.error(error);
        }
    }

    const handelOTPSubmit = async () => {
        try {
            await confirmationResult.confirm(otp);
            setOtp('');
            router.push('/dashboard');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            {!otpSent ? (<div id="recaptcha-container"></div>) : null}
            <input
                type="tel"
                value={phoneNumber}
                onChange={handelPhoneNumberChange}
                placeholder="Eg +919988778856"
                className="border border-gray-500 p-2 rounded-md m-2"
            />
            <input
                type="text"
                value={otp}
                onChange={handelOTPChange}
                placeholder="Enter OTP "
                className="border border-gray-500 p-2 rounded-md gap-1"
            />
            <button
                onClick={otpSent ? handelOTPSubmit : handelSendOtp}
                className={`bg-${otpSent ? 'green' : 'blue'}-500 text-white p-2 rounded-md m-2`}
                style={{ backgroundColor: otpSent ? 'green' : 'blue' }}
            >
                {otpSent ? 'Submit OTP' : 'Send OTP'}
            </button>
        </div>
    );
}

export default Login;