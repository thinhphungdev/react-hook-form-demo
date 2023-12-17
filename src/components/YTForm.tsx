import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

type FormValue = {
  username: string;
  email: string;
  channel: string;
};

export const YouTubeForm = () => {
  const { register, control, handleSubmit, formState } = useForm<FormValue>();
  const { errors } = formState;

  const onSubmit = (data: FormValue) => {
    console.log('Submitted', data);
  };

  return (
    <div>
      <h1>YT Form</h1>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label htmlFor='username'>Username</label>
        <input
          type='text'
          id='username'
          {...register('username', {
            required: 'Username is required',
          })}
        />
        <p className='error'>{errors.username?.message}</p>

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
          })}
        />
        <p className='error'>{errors.email?.message}</p>

        <label htmlFor='channel'>Channel</label>
        <input
          type='text'
          id='channel'
          {...register('channel', {
            required: 'Channel is required',
          })}
        />
        <p className='error'>{errors.channel?.message}</p>

        <button>Submit</button>
      </form>

      <DevTool control={control} />
    </div>
  );
};
