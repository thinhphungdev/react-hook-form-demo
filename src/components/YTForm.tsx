import { useForm, useFieldArray, FieldErrors } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { useEffect } from 'react';

type FormValue = {
  username: string;
  email: string;
  channel: string;
  social: {
    facebook: string;
    twitter: string;
  };
  phoneNumbers: string[];
  phNumbers: {
    number: string;
  }[];
  age: number;
  dob: Date;
};

const YTformDefaultValue: FormValue = {
  username: 'haha',
  email: '',
  channel: '',
  social: {
    twitter: '',
    facebook: '',
  },
  phoneNumbers: ['', ''],
  phNumbers: [{ number: '' }],
  age: 0,
  dob: new Date(),
};

export const YouTubeForm = () => {
  const {
    register,
    reset,
    control,
    handleSubmit,
    formState,
    setValue,
    watch,
    trigger,
  } = useForm<FormValue>({
    defaultValues: YTformDefaultValue,
  });

  const { errors, isDirty, isSubmitting, isSubmitted } = formState;

  const { fields, append, remove } = useFieldArray({
    name: 'phNumbers',
    control,
  });

  const onSubmit = (data: FormValue) => {
    console.log('Submitted', data);
  };

  function handleValues() {
    // getValues(); - get all values
    // getValues('social.twitter')
  }

  function handleSetValue() {
    setValue('username', 'hihi', {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  }

  const onError = (errors: FieldErrors<FormValue>) => {
    console.log(errors, 'Fom error');
  };

  useEffect(() => {
    reset();
  }, [isSubmitted, reset]);

  return (
    <div>
      <h1>YT Form</h1>

      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <div className='form-control'>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            id='username'
            {...register('username', {
              required: 'Username is required',
            })}
          />
          <p className='error'>{errors.username?.message}</p>
        </div>
        <div className='form-control'>
          <label htmlFor='email'>E-mail</label>
          <input
            type='email'
            id='email'
            {...register('email', {
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: 'Invalid email format',
              },
              validate: {
                notAdmin: (fieldValue) => {
                  return (
                    fieldValue !== 'admin@example.com' ||
                    'Enter a different email address'
                  );
                },
                notBlackList: (fieldValue) => {
                  return (
                    !fieldValue.endsWith('demo.com') ||
                    'This domain is not supported'
                  );
                },
                emailAvailable: async (fieldValue) => {
                  const response = await fetch(
                    `https://jsonplaceholder.typicode.com/users?email=${fieldValue}`
                  );
                  const data = await response.json();
                  return data.length == 0 || 'Email already exists';
                },
              },
            })}
          />
          <p className='error'>{errors.email?.message}</p>
        </div>

        <div className='form-control'>
          <label htmlFor='channel'>Channel</label>
          <input
            type='text'
            id='channel'
            {...register('channel', {
              required: 'Channel is required',
            })}
          />
          <p className='error'>{errors.channel?.message}</p>
        </div>

        <div className='form-control'>
          <label htmlFor='twitter'>Twitter</label>
          <input type='text' id='twitter' {...register('social.twitter')} />
        </div>

        <div className='form-control'>
          <label htmlFor='facebook'>Facebook</label>
          <input
            type='text'
            id='facebook'
            {...register('social.facebook', {
              disabled: watch('channel') === '',
            })}
          />
        </div>

        <div className='form-control'>
          <label htmlFor='primary-phone'>Primary phone number</label>
          <input
            type='text'
            id='primary-phone'
            {...register('phoneNumbers.0')}
          />
        </div>

        <div className='form-control'>
          <label htmlFor='secondary-phone'>Secondary phone number</label>
          <input
            type='text'
            id='secondary-phone'
            {...register('phoneNumbers.1')}
          />
        </div>

        <div>
          <label htmlFor=''>List of phone numbers</label>
          <div>
            {fields.map((field, idx) => {
              return (
                <div className='form-control' key={field.id}>
                  <input type='text' {...register(`phNumbers.${idx}.number`)} />
                  {idx > 0 && (
                    <button type='button' onClick={() => remove(idx)}>
                      Remove
                    </button>
                  )}
                </div>
              );
            })}
            <button type='button' onClick={() => append({ number: '' })}>
              Add new Phone number
            </button>
          </div>
        </div>

        <div className='form-control'>
          <label htmlFor='Age'>Age</label>
          <input
            type='number'
            id='age'
            {...register('age', {
              required: 'Age is required',
              valueAsNumber: true,
            })}
          />
          <p className='error'>{errors.age?.message}</p>
        </div>

        <div className='form-control'>
          <label htmlFor='dob'>Date of birth</label>
          <input
            type='text'
            id='dob'
            {...register('dob', {
              required: 'DOB is required',
              valueAsDate: true,
            })}
          />
          <p className='error'>{errors.dob?.message}</p>
        </div>

        <button disabled={!isDirty || isSubmitting}>Submit</button>
        <button type='button' onClick={handleValues}>
          Get Values
        </button>
        <button type='button' onClick={handleSetValue}>
          Set Values
        </button>

        <button onClick={() => trigger()}>Validate Manually</button>
      </form>

      <DevTool control={control} />
    </div>
  );
};
