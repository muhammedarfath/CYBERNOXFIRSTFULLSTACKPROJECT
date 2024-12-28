import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import BasicDetailstwo from "../../../Pages/BasicDetailstwo";

function BasicDetailSec() {
    const [submit, setSubmit] = useState(false);
    return (
        <div className="flex lg:w-1/2 justify-center w-full md:p-4">
            {!submit ? (
                <form className="w-full md:max-w-2xl bg-white rounded-lg p-6 shadow-2xl">
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="groom-name"
                            >
                                Groom Name
                            </label>
                            <input
                                className="appearance-none block w-full text-gray-700 bg-gray-200 border border-gray rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="groom-name"
                                type="text"
                                placeholder="Enter Groom Name"
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full sm:w-1/3 px-3 mb-3 sm:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Day
                            </label>
                            <select className="block w-full bg-gray-200 text-gray-700 border border-gray rounded py-3 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                <option>Day</option>
                                {[...Array(31)].map((_, i) => (
                                    <option key={i} value={i + 1}>
                                        {i + 1}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="w-full sm:w-1/3 px-3 mb-3 sm:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Month
                            </label>
                            <select className="block w-full bg-gray-200 text-gray-700 border border-gray rounded py-3 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                <option>Month</option>
                                {[
                                    "January",
                                    "February",
                                    "March",
                                    "April",
                                    "May",
                                    "June",
                                    "July",
                                    "August",
                                    "September",
                                    "October",
                                    "November",
                                    "December",
                                ].map((month, index) => (
                                    <option key={index} value={month}>
                                        {month}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="w-full sm:w-1/3 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Year
                            </label>
                            <select className="block w-full bg-gray-200 text-gray-700 border border-gray rounded py-3 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                <option>Year</option>
                                {[...Array(100)].map((_, i) => (
                                    <option key={i} value={2024 - i}>
                                        {2024 - i}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="marital-status"
                            >
                                Marital Status
                            </label>
                            <select
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="marital-status"
                            >
                                <option>Choose One</option>
                                <option>Single</option>
                                <option>Married</option>
                                <option>Divorced</option>
                                <option>Widowed</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full sm:w-1/2 px-3 mb-3 sm:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Sect
                            </label>
                            <select className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                <option>Choose Sect</option>
                                <option>Sunni</option>
                                <option>Shia</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div className="w-full sm:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Caste
                            </label>
                            <select className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                <option>Choose Caste</option>
                                <option>Caste A</option>
                                <option>Caste B</option>
                                <option>Caste C</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full sm:w-1/2 px-3 mb-3 sm:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Mother Tongue
                            </label>
                            <select className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                <option>Choose Language</option>
                                <option>English</option>
                                <option>Hindi</option>
                                <option>Tamil</option>
                            </select>
                        </div>
                        <div className="w-full sm:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Height
                            </label>
                            <select className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                <option>Choose Height</option>
                                <option>5'0"</option>
                                <option>5'5"</option>
                                <option>6'0"</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-center flex-col">
                        <button
                            className="bg-button text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={() => setSubmit(true)}
                        >
                            SUBMIT
                        </button>
                    </div>
                </form>
            ) : (
                <CSSTransition in={submit} timeout={300} classNames="transition">
                    <BasicDetailstwo />
                </CSSTransition>
            )}
        </div>
    );
}

export default BasicDetailSec;
