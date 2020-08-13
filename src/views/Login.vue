<template>
  <div class="login-box">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="180px"
      status-icon
    >
      <el-form-item v-if="!resetting" label="Username" prop="username">
        <el-input
          :disabled="resetting"
          placeholder="Please input username (i.e. email address)"
          autocomplete="off"
          v-model="form.username"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item v-if="!resetting" label="Password" prop="password">
        <el-input
          :disabled="resetting"
          placeholder="Please input password"
          autocomplete="off"
          v-model="form.password"
          clearable
          show-password
        ></el-input>
        <el-link v-if="!resetting" type="primary" @click="resetPassword"
          >Forgot password?</el-link
        >
      </el-form-item>
      <el-form-item v-if="resetting" label="New Password" prop="newPassword">
        <el-input
          :disabled="!resetting"
          placeholder="Please input your new password"
          autocomplete="off"
          v-model="form.newPassword"
          clearable
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item
        v-if="resetting"
        label="Repeat Password"
        prop="newPasswordCheck"
      >
        <el-input
          :disabled="!resetting"
          placeholder="Please input the password again"
          autocomplete="off"
          v-model="form.newPasswordCheck"
          clearable
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item>
        <div class="button-holder">
          <el-tooltip
            class="tooltip"
            effect="dark"
            content="Log in"
            placement="left"
          >
            <el-button
              type="success"
              @click="onSubmit"
              icon="el-icon-check"
              circle
            ></el-button>
          </el-tooltip>
          <el-tooltip
            v-if="!resetting"
            class="tooltip"
            effect="dark"
            content="Sign Up"
            placement="bottom"
          >
            <router-link to="/signup"
              ><el-button
                type="primary"
                icon="el-icon-plus
"
                circle
              ></el-button
            ></router-link>
          </el-tooltip>
          <el-tooltip
            v-if="!resetting"
            class="tooltip"
            effect="dark"
            content="Home page"
            placement="right"
          >
            <router-link to="/"
              ><el-button type="info" icon="el-icon-s-home" circle></el-button
            ></router-link>
          </el-tooltip>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import router from "./../router";
import firebase from "@firebase/app";
export default {
  data() {
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input password again!"));
      } else {
        var checker = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/;
        if (value.match(checker)) {
          callback();
        } else {
          callback(
            new Error(
              "Password must be 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character!"
            )
          );
        }
      }
    };

    var validateCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please repeat password again!"));
      } else {
        if (value === this.form.newPassword) {
          callback();
        } else {
          callback(new Error("Passwords do not match!"));
        }
      }
    };
    return {
      resetting: false,
      form: {
        username: "",
        password: "",
        newPassword: "",
        newPasswordCheck: ""
      },
      rules: {
        username: [
          {
            required: true,
            message: "Please enter username (email address)!",
            trigger: "blur"
          },
          {
            type: "email",
            message: "Please enter email address!",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "Please enter password!",
            trigger: "blur"
          }
        ],
        newPassword: [
          {
            required: true,
            message: "Please enter password!",
            trigger: "blur"
          },
          { validator: validatePassword, trigger: "change" }
        ],
        newPasswordCheck: [
          {
            required: true,
            message: "Please enter password!",
            trigger: "blur"
          },
          { validator: validateCheck, trigger: "change" }
        ]
      }
    };
  },
  created: function() {
    try {
      this.resetting = false;
      var mode = this.getParamterByName("mode");
      var actionCode = this.getParamterByName("oobCode");
      if (mode === "verifyEmail" && actionCode != null) {
        firebase
          .auth()
          .applyActionCode(actionCode)
          .then(() => {
            this.$notify.success(
              "Email address has been verified! You are logged in!"
            );
            firebase.auth();
            router.push("/");
          })
          .catch(err => {
            console.error(err);
            this.$notify.error(
              "Verification link has expired. Please verify your email address again!"
            );
            router.push("/verify");
          });
      } else if (mode == "resetPassword" && actionCode != null) {
        this.resetting = true;
      }
    } catch (e) {
      console.error(e);
    }
  },
  methods: {
    getParamterByName(name) {
      var url = new URL(window.location.href);
      try {
        return url.searchParams.get(name);
      } catch (e) {
        console.error(e);
        return null;
      }
    },
    resetPassword() {
      this.$refs.form.validateField("username", err => {
        if (err === "") {
          firebase
            .auth()
            .sendPasswordResetEmail(this.form.username)
            .then(() => {
              this.$notify.success(
                "Password reset email has been sent! Please check your email!"
              );
            })
            .catch(err => {
              var errorCode = err.code;
              if (errorCode == "auth/invalid-email") {
                this.$notify.error("Invalid email address!");
              } else if (errorCode == "auth/user-not-found") {
                this.$notify.error("You have not registered yet!");
                router.push("/signup");
              }
            });
        }
      });
    },
    onSubmit() {
      if (this.resetting) {
        this.$refs.form.validate(valid => {
          if (valid) {
            var actionCode = this.getParamterByName("oobCode");
            var accountEmail;
            firebase
              .auth()
              .verifyPasswordResetCode(actionCode)
              .then(email => {
                accountEmail = email;
                firebase
                  .auth()
                  .confirmPasswordReset(actionCode, this.form.newPassword)
                  .then(() => {
                    firebase
                      .auth()
                      .signInWithEmailAndPassword(
                        accountEmail,
                        this.form.newPassword
                      )
                      .then(() => {
                        var user = firebase.auth().currentUser;
                        if (user.emailVerified) {
                          this.$notify.success(
                            "You are logged in successfully!"
                          );
                          router.push("/");
                        } else {
                          this.$notify.warning(
                            "Please verify your email first!"
                          );
                          router.push("/verify");
                        }
                      });
                  });
              });
          } else {
            return false;
          }
        });
      } else {
        this.$refs.form.validate(valid => {
          if (valid) {
            if (firebase.auth().currentUser) {
              firebase.auth().signOut();
            } else {
              firebase
                .auth()
                .signInWithEmailAndPassword(
                  this.form.username,
                  this.form.password
                )
                .then(() => {
                  var user = firebase.auth().currentUser;
                  if (user) {
                    if (user.emailVerified) {
                      console.log(user);
                      this.$notify.success("You are logged in successfully!");
                      router.push("/");
                    } else {
                      this.$notify.warning("Please verify your email first!");
                      router.push("/verify");
                    }
                  }
                })
                .catch(err => {
                  if (err.code == "auth/wrong-password") {
                    this.$notify.error({
                      title: "Error",
                      message: "Wrong password!"
                    });
                    router.push("/login");
                  } else if (err.code == "auth/user-not-found") {
                    this.$notify.error({
                      title: "Error",
                      message: "You are not registered yet!"
                    });
                    router.push("/signup");
                  } else {
                    this.$notify.error({
                      title: "Error",
                      message: "Unknown error!"
                    });
                    console.error(err);
                    router.push("/login");
                  }
                });
            }
          } else {
            return false;
          }
        });
      }
    }
  }
};
</script>

<style scoped>
.button-holder {
  display: flex;
  justify-content: center;
  padding-right: 0%;
  margin-right: 180px;
}
.login-box {
  margin-left: 20%;
  margin-right: 20%;
  margin-top: 20px;
}

.el-button {
  margin: 1rem;
}

@media (max-width: 768px) {
  .login-box {
    margin-left: 20px;
    margin-right: 20px;
  }
  .el-button {
    margin: 0rem;
    margin-right: 20px;
  }
  .button-holder {
    margin-left: 32% !important;
  }
}
</style>
