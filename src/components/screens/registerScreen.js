import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Redirect } from "react-router";
import authService from "../services/auth.service";
var crypto = require('crypto');

export default class RegisterScreen extends Component {
    constructor(props) {
        super(props);

        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            username: "",
            password: "",
            isRedirect: undefined,

        };

    }

    onChangeFirstName(u) {
        this.setState({
            firstName: u.target.value,
        });
    }

    onChangeLastName(u) {
        this.setState({
            lastName: u.target.value,
        });
    }

    onChangeEmail(u) {
        this.setState({
            email: u.target.value,
        });
    }

    onChangeUsername(u) {
        this.setState({
            username: u.target.value,
        });
    }

    onChangePassword(u) {
        this.setState({
            password: u.target.value,
        });
    }

    async onSubmit(u) {
        u.preventDefault();
        const hash = await crypto.createHash('sha256').update(this.state.password).digest('base64');

        authService.register(this.state.username, this.state.email, hash, this.state.firstName, this.state.lastName)
            .then((res) => {
                console.log(res.data);
                toast("Successfully Registed !", {
                    type: "warning",
                });
                this.setState({
                    isRedirect: 1,
                });
            },
                error => {
                    this.setState({
                        isRedirect: 0
                    })
                    toast("Kh??ng th??? ?????i email, ki???m tra l???i n???u c?? tr??ng :)", {
                        type: "danger"
                    })
                })
    }

    render() {
        const isLoading = this.state.isLoading

        if (this.state.isRedirect) return <Redirect to="/items" />;
        return (
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Xin ch??o
                        </h2>
                        {/* <p className="mt-2 text-center text-sm text-gray-600">
                            Or
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                start your 14-day free trial
                            </a>
                        </p> */}
                    </div>
                    <form onSubmit={this.onSubmit} className="mt-8 space-y-6" action="#" method="POST">
                        <input type="hidden" name="remember" value="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label for="firstname" className="sr-only">First Name</label>
                                <input
                                    id="firstname"
                                    name="userfirstnamename"
                                    type="text"
                                    value={this.state.firstName}
                                    onChange={this.onChangeFirstName}
                                    autocomplete="firstname"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Firstname"
                                />
                            </div>
                            <div>
                                <label for="lastname" className="sr-only">Password</label>
                                <input
                                    id="lastname"
                                    name="lastname"
                                    type="text"
                                    value={this.state.lastname}
                                    onChange={this.onChangeLastName}
                                    autocomplete="lastname"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Lastname"
                                />
                            </div>

                            <div>
                                <label for="username" className="sr-only">Password</label>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    value={this.state.username}
                                    onChange={this.onChangeUsername}
                                    autocomplete="username"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Username"
                                />
                            </div>
                            <div>
                                <label for="password" className="sr-only">Password</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={this.state.password}
                                    onChange={this.onChangePassword}
                                    autocomplete="current-password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                />
                            </div>
                            <div>
                                <label for="username" className="sr-only">Password</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="text"
                                    value={this.state.email}
                                    onChange={this.onChangeEmail}
                                    autocomplete="email"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Email"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                                <label for="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Ghi nh???
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    ???? c?? t??i kho???n ?
                                </a>
                            </div>
                        </div>

                        {
                            this.state.isRedirect === 0 &&
                            (
                                <div class="my-3 block  text-sm text-left text-red-600  bg-red-500 bg-opacity-10 border border-red-400 h-12 flex items-center p-4 rounded-md">
                                    Kh??ng th??? ????ng k??, email ho???c username ???? t???n t???i ho???c ch??a ????ng.
                                </div>
                            )
                        }
                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                                    </svg>
                                </span>
                                ????ng k??
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
