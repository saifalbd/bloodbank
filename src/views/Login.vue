<template>
<div
    id="login"
    style="height:100vh"
    class="d-flex justify-content-center align-content-center">
    <PasswordReset
        v-model="showPasswordReset"
        @close="togglePasswordReset()"></PasswordReset>
    <section class="row h-100 w-100  align-content-center">
        <div class="col-12  col-md-6">
        </div>

        <div
            :class="{ 'signup-form': !showLoginForm }"
            class="col-12  col-md-6">

            <b-overlay
                :show="overly"
                rounded="sm">

                <vo
                    ref="login"
                    v-slot="{ handleSubmit }"
                    v-if="showLoginForm">

                    <form @submit.prevent="handleSubmit(login)">
                        <h1>Welcome Back</h1>

                        <div>
                            <vp
                                name="email"
                                vid="email"
                                rules="required"
                                v-slot="{ valid, errors }">
                                <b-form-group
                                    label="Email"
                                    :invalid-feedback="errors[0]"
                                    :state="$root.vs(valid, errors)">
                                    <b-form-input
                                        v-model.trim="loginForm.email"
                                        placeholder="you@email.com">
                                    </b-form-input>
                                </b-form-group>
                            </vp>

                        </div>
                        <div>
                            <vp
                                name="password"
                                vid="pasword"
                                rules="required"
                                v-slot="{ valid, errors }">
                                <b-form-group
                                    label="Password"
                                    :invalid-feedback="errors[0]"
                                    :state="$root.vs(valid, errors)">
                                    <b-form-input
                                        v-model.trim="loginForm.password"
                                        placeholder="******">
                                    </b-form-input>
                                </b-form-group>
                            </vp>

                        </div>

                        <b-container class="d-flex justify-content-between p-2">
                            <div>
                                <button type="submit" class="btn btn-primary" tabindex="3">Log In</button>
                            </div>
                            <div>
                                <a @click="togglePasswordReset()">Forgot Password</a>
                                <br />

                                <a @click="toggleForm()">Create an Account</a>
                            </div>

                        </b-container>
                    </form>
                </vo>
                <vo
                    ref="signup"
                    v-slot="{ handleSubmit }"
                    v-else>
                    <form @submit.prevent="handleSubmit(signup)">
                        <h1>Get Started</h1>
                        <div>
                            <vp
                                name="name"
                                vid="name"
                                rules="required"
                                v-slot="{ valid, errors }">
                                <b-form-group
                                    label="Name"
                                    :invalid-feedback="errors[0]"
                                    :state="$root.vs(valid, errors)">
                                    <b-form-input
                                        v-model.trim="signupForm.name"
                                        placeholder="Name here">
                                    </b-form-input>
                                </b-form-group>
                            </vp>

                        </div>
                        <div>
                            <vp
                                name="title"
                                vid="title"
                                rules="required"
                                v-slot="{ valid, errors }">
                                <b-form-group
                                    label="Title"
                                    :invalid-feedback="errors[0]"
                                    :state="$root.vs(valid, errors)">
                                    <b-form-select
                                        v-model="signupForm.title"
                                        :options="structureOfTheExecutiveCouncil"></b-form-select>
                                </b-form-group>
                            </vp>

                            <!-- <input v-model.trim="signupForm.title" type="text" placeholder="Company" id="title" /> -->
                        </div>
                        <div>
                            <vp
                                name="email"
                                vid="email"
                                rules="required"
                                v-slot="{ valid, errors }">
                                <b-form-group
                                    label="Email"
                                    :invalid-feedback="errors[0]"
                                    :state="$root.vs(valid, errors)">
                                    <b-form-input
                                        v-model.trim="signupForm.email"
                                        placeholder="you@email.com">
                                    </b-form-input>
                                </b-form-group>
                            </vp>

                        </div>
                        <div>
                            <vp
                                name="password"
                                vid="pasword"
                                rules="required"
                                v-slot="{ valid, errors }">
                                <b-form-group
                                    label="Password"
                                    :invalid-feedback="errors[0]"
                                    :state="$root.vs(valid, errors)">
                                    <b-form-input
                                        v-model.trim="signupForm.password"
                                        placeholder="******">
                                    </b-form-input>
                                </b-form-group>
                            </vp>

                        </div>
                        <b-container class="d-flex justify-content-between p-2">

                            <button type="submit" class="btn btn-primary">Sign Up</button>
                            <a @click="toggleForm()">Back to Log In</a>
                        </b-container>

                    </form>
                </vo>
            </b-overlay>
        </div>

    </section>

</div>
</template>

<script>
import PasswordReset from '@/components/PasswordReset'

import {
    structureOfTheExecutiveCouncil
} from '@/plugins/dorDown'

import {
    BFormInput,
    BFormSelect,
    BFormGroup,
    BButton,
    BOverlay,
    BContainer
} from 'bootstrap-vue';
import {
    auth
} from '@/firebase';

export default {
    components: {
        BContainer,
        PasswordReset,
        BFormSelect,
        BFormGroup,
        BFormInput,
        BOverlay

    },
    data() {
        return {
            structureOfTheExecutiveCouncil: structureOfTheExecutiveCouncil,
            loginForm: {
                email: 'saif@gmail.com',
                password: '123456'
            },
            signupForm: {
                name: 'saiful islam',
                title: '',
                email: 'saif@gmail.com',
                password: '123456'
            },
            showLoginForm: true,
            showPasswordReset: false,
            overly: false
        }
    },
    methods: {
        toggleForm() {
            this.showLoginForm = !this.showLoginForm
        },
        togglePasswordReset() {
            this.showPasswordReset = !this.showPasswordReset
        },
        login() {
            this.overly = true;
            this.$store.dispatch('login', {
                email: this.loginForm.email,
                password: this.loginForm.password
            })
        },
        signup() {
            this.overly = true;
            this.$store.dispatch('signup', {
                email: this.signupForm.email,
                password: this.signupForm.password,
                name: this.signupForm.name,
                title: this.signupForm.title
            })
        }
    },
    // async created() {
    //     if (auth.currentUser) {
    //         await auth.signOut()

    //     }
    // }
}
</script>
