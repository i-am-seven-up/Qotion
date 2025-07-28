"use client";
import { SignInButton } from "@clerk/nextjs";
import { Button } from "./button";

 

function SignInBtn() {
  return (
    <SignInButton mode="modal">
        <Button>Sign In</Button>    
    </SignInButton>
  )
}
export default SignInBtn