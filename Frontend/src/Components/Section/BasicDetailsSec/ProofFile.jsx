import React from "react";

function ProofFile({ otpSent, aadharNumber, handleFileChange, preview }) {
  return (
    <>
      {!otpSent && !aadharNumber && (
        <>
          <div>
            <h1 className="text-center font-bold mb-6">or</h1>
          </div>
          <div className="flex items-center justify-center w-full mb-6">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500">
                  Upload your Driving License or Passport
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                multiple
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>

          {preview && preview.length > 0 && (
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              {preview.map((imgSrc, index) => (
                <img
                  key={index}
                  src={imgSrc}
                  alt="image"
                  className="w-32 h-32 object-cover rounded-lg"
                />
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
}

export default ProofFile;
