<template>
  <div style="text-align: center;">
    <h3>
      A verification email will be sent to your email shortly! Please verify
      your username(email address) in your mailbox and sign in to your account
      afterwards!
    </h3>
    <div>
      <el-link type="primary" @click="resend"
        >Didn't receive the email or link expired? Click here to resend the
        verification!</el-link
      >
    </div>
    <div class="placeholder"></div>
    <el-button type="success" round @click="signin">Sign In</el-button>
  </div>
</template>

<script>
import router from "./../router";
import { firebase } from "@firebase/app";
export default {
  data() {
    return {
      email: ""
    };
  },
  methods: {
    signin: function() {
      router.push("/login");
    },
    resend: function() {
      console.log(firebase.auth().currentUser);
      firebase
        .auth()
        .currentUser.sendEmailVerification()
        .then(() => {
          this.$message.success(
            "Verification email has been sent! Please check your mailbox!"
          );
        });
    }
  }
};
</script>
