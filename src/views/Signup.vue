<template>
  <div class="signup-box">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="180px"
      status-icon
    >
      <el-form-item label="Username" prop="username">
        <el-input
          placeholder="Please input username"
          autocomplete="off"
          v-model="form.username"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input
          placeholder="Please input password"
          autocomplete="off"
          v-model="form.password"
          clearable
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="Repeat Password" prop="check">
        <el-input
          placeholder="Please repeat your password again"
          autocomplete="off"
          v-model="form.check"
          clearable
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item>
        <div class="button-holder">
          <el-tooltip
            class="tooltip"
            effect="dark"
            content="Sign up"
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
import { firebase } from "@firebase/app";
import router from "./../router";
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
        if (value === this.form.password) {
          callback();
        } else {
          callback(new Error("Passwords do not match!"));
        }
      }
    };
    return {
      form: {
        username: "",
        password: "",
        check: ""
      },
      rules: {
        username: [
          {
            required: true,
            message: "Please enter username!",
            trigger: "blur"
          },
          {
            type: "email",
            message: "Please input correct email address",
            trigger: ["blur", "change"]
          }
        ],
        password: [
          {
            required: true,
            message: "Please enter password!",
            trigger: "blur"
          },
          { validator: validatePassword, trigger: "change" }
        ],
        check: [
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
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          window.localStorage.setItem("username", this.form.username);
          firebase
            .auth()
            .createUserWithEmailAndPassword(
              this.form.username,
              this.form.password
            )
            .then(() => {
              this.$notify({
                title: "Success",
                message:
                  "Signup successfully! Please verify your email address!",
                type: "success"
              });
              firebase
                .auth()
                .signInWithEmailAndPassword(
                  this.form.username,
                  this.form.password
                )
                .then(() => {
                  firebase
                    .auth()
                    .currentUser.sendEmailVerification()
                    .then(() => {
                      router.push("/verify");
                    });
                });
            })
            .catch(err => {
              if (err.code === "auth/email-already-in-use") {
                this.$notify.warning({
                  title: "Account existed",
                  message: "You already have an account! Please sign in!"
                });
                router.push("/login");
              } else {
                console.error(err);
                this.$notify.error({
                  title: "Error",
                  message:
                    "Oops something went wrong when we try to create an account for you! Please try again!"
                });
              }
            });
        } else {
          return false;
        }
      });
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
.signup-box {
  margin-left: 20%;
  margin-right: 20%;
  margin-top: 20px;
}

.el-button {
  margin: 1rem;
}

@media (max-width: 768px) {
  .signup-box {
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
