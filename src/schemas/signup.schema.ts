import * as Yup from 'yup';
import type { AnySchema } from 'yup';
import type { ISignupForm } from '../interfaces/ISignupForm';

export const signupSchema = Yup.object<
  Record<keyof ISignupForm, AnySchema>
>().shape({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .required('Username is required')
    .matches(/^\S*$/, 'Whitespace is not allowed'),
  email: Yup.string().email('Email is invalid').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required')
    .matches(/^\S*$/, 'Whitespace is not allowed'),
  confirmPassword: Yup.string()
    .required('Confirm password is required')
    .test('passwords-match', 'Password does not match', function (value) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      return this.parent.password === value;
    }),
  termsAndConditions: Yup.boolean().oneOf(
    [true],
    'Terms and conditions is required'
  ),
});
