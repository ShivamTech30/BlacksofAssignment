import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface FormValues {
  fullName: string;
  email: string;
  company: string;
  message: string;
}

const GetinTouch: React.FC = React.memo(() => {
  const initialValues: FormValues = {
    fullName: '',
    email: '',
    company: '',
    message: '',
  };

  const validationSchema = Yup.object({
    fullName: Yup.string()
      .required('Full name is required')
      .min(2, 'Full name must be at least 2 characters'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    company: Yup.string().required('Company is required'),
    message: Yup.string()
      .required('Message is required')
      .min(10, 'Message must be at least 10 characters'),
  });

  const handleSubmit = (values: FormValues) => {
    console.log('Form submitted with values:', values);
    // Add your form submission logic here (e.g., API call)
  };

  const contactDetails = [
    {
      label: 'Address:',
      value: '110, 16th Road, Chembur, Mumbai - 400071',
    },
    {
      label: 'Phone:',
      value: '+91 22 25280822',
    },
    {
      label: 'Email:',
      value: 'info@supremegroup.co.in',
    },
  ];

  return (
    <div className="lg:min-h-[800px] md:min-h-[800px]  min-h-[1020px] bg-[#0A6ABF] text-white px-8 lg:p-20 md:px-[50px] lg:px-[250px] grid md:grid-cols-2 gap-8">
      {/* Left Section (Contact Information) */}
      <div className="flex flex-col justify-center space-y-6">
        <h2 className="text-5xl font-medium leading-tight">Get in touch</h2>
        <div className="w-14 border-b-[4px] border-white my-5"></div>
        <p className="text-lg">For general enquiries</p>

        <div className="mt-6 space-y-10">
          {contactDetails.map((detail, index) => (
            <p key={index} className="leading-relaxed">
              <span className="font-medium text-[24px]">{detail.label}</span>
              <br />
              <span className="text-[18px] font-light">{detail.value}</span>
            </p>
          ))}
        </div>
      </div>

      {/* Right Section (Form) */}
      <div className="flex flex-col justify-center">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              {['fullName', 'email', 'company', 'message'].map((field, index) => (
                <div key={index}>
                  <Field
                    type={field === 'message' ? 'textarea' : 'text'}
                    name={field}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    className="w-full py-1 bg-transparent border-b border-white text-white placeholder-white outline-none text-lg"
                    as={field === 'message' ? 'textarea' : 'input'}
                    rows={field === 'message' ? 4 : undefined}
                  />
                  <ErrorMessage
                    name={field}
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              ))}

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 border border-white text-white lg:w-[30%] md:w-[30%] w-[100%] rounded-full text-lg hover:bg-white hover:text-black transition"
              >
                Send
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
});

export default GetinTouch;