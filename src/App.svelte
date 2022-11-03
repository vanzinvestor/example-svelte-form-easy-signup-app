<script lang="ts">
  import logo from './logo.svg';
  import { useForm } from 'svelte-form-easy';
  import type { ISignupForm } from './interfaces/ISignupForm';
  import { signupSchema } from './schemas/signup.schema';

  const initialValues: ISignupForm = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAndConditions: false,
  };

  const {
    form,
    touched,
    useValidForm,
    useValidTouch,
    handleChange,
    handleTouch,
    handleReset,
    handleForceTouched,
  } = useForm<ISignupForm>({
    initialValues: initialValues,
    validationSchema: signupSchema,
  });

  $: valid = useValidForm($form);
  $: dirty = useValidTouch($touched);

  const handleSubmit = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (valid.isValid) {
      console.log($form);
      handleReset();
    } else {
      handleForceTouched();
    }
  };
</script>

<main>
  <img src={logo} alt="" />
  <h1>Svelte Form Easy</h1>
  <form on:submit={handleSubmit}>
    <div class="input-field">
      <label for="username">Username</label>
      <input
        type="text"
        name="username"
        id="username"
        on:focus={handleTouch}
        on:change={handleChange}
        bind:value={$form.username}
        class={valid.errors?.username && $touched.username
          ? 'is-invalid'
          : $touched.username
          ? 'is-valid'
          : ''}
        autocomplete="off"
        placeholder="Enter Username"
      />
      {#if valid.errors?.username && $touched.username}
        <span class="invalid-feedback">{valid.errors?.username}</span>
      {/if}
    </div>
    <div class="input-field">
      <label for="email">Email</label>
      <input
        type="text"
        name="email"
        id="email"
        on:focus={handleTouch}
        on:change={handleChange}
        bind:value={$form.email}
        class={valid.errors?.email && $touched.email
          ? 'is-invalid'
          : $touched.email
          ? 'is-valid'
          : ''}
        autocomplete="off"
        placeholder="Enter Email"
      />
      {#if valid.errors?.email && $touched.email}
        <span class="invalid-feedback">{valid.errors?.email}</span>
      {/if}
    </div>
    <div class="input-field">
      <label for="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        on:focus={handleTouch}
        on:change={handleChange}
        bind:value={$form.password}
        class={valid.errors?.password && $touched.password
          ? 'is-invalid'
          : $touched.password
          ? 'is-valid'
          : ''}
        autocomplete="off"
        placeholder="Enter Password"
      />
      {#if valid.errors?.password && $touched.password}
        <span class="invalid-feedback">{valid.errors?.password}</span>
      {/if}
    </div>
    <div class="input-field">
      <label for="confirmPassword">Confirm Password</label>
      <input
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        on:focus={handleTouch}
        on:change={handleChange}
        bind:value={$form.confirmPassword}
        class={valid.errors?.confirmPassword && $touched.confirmPassword
          ? 'is-invalid'
          : $touched.confirmPassword
          ? 'is-valid'
          : ''}
        placeholder="Confirm Password"
        autocomplete="off"
      />
      {#if valid.errors?.confirmPassword && $touched.confirmPassword}
        <span class="invalid-feedback">{valid.errors?.confirmPassword}</span>
      {/if}
    </div>
    <div class="input-terms">
      <input
        type="checkbox"
        name="termsAndConditions"
        id="termsAndConditions"
        on:focus={handleTouch}
        on:change={handleChange}
        bind:checked={$form.termsAndConditions}
        class="terms"
      />
      <label for="termsAndConditions">
        <p>
          By creating an account you agree to our <a
            href="/terms-and-conditions">Terms & Conditions</a
          >.
        </p>
      </label>
      {#if valid.errors?.termsAndConditions && $touched.termsAndConditions}
        <span class="terms-invalid-feedback"
          >{valid.errors?.termsAndConditions}</span
        >
      {/if}
    </div>
    <div class="input-field">
      <button type="submit" disabled={!valid.isValid && dirty}>Register</button>
    </div>
  </form>
</main>

<style type="scss">
  $color: #ff3e00;
  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }

  img {
    height: 80px;
  }

  h1 {
    color: $color;
    text-transform: uppercase;
    font-size: 2.5em;
    font-weight: 100;
  }

  form {
    margin: 0 auto;
    max-width: 380px;
    width: 100%;
    padding: 1rem 0;
  }
  .input-field {
    width: 100%;
    text-align: left;
    position: relative;
  }

  .input-field label {
    color: #555;
  }

  input {
    &:not(.terms) {
      min-width: 250px;
    }

    width: 100%;
    outline: none;
    border: none;
    line-height: 1;
    padding: 12px 20px;
    margin: 14px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;

    &:focus {
      outline: none;
      border: 1px solid #aaa;
    }

    &.is-valid,
    &:focus.is-valid {
      border: 2px solid #4caf50;
    }

    &.is-invalid,
    &:focus.is-invalid {
      border: 2px solid #dc3545;
    }
  }

  .invalid-feedback,
  .terms-invalid-feedback {
    position: absolute;
    bottom: -2px;
    left: 0;
    padding-left: 5px;
    font-size: 0.875em;
    color: #dc3545;
  }

  .terms-invalid-feedback {
    bottom: -10px;
  }

  .input-terms {
    display: flex;
    flex-direction: row;
    margin: 8px 0;
    position: relative;
  }

  input.terms {
    width: 20px;
  }

  .input-terms label {
    width: 250px;
  }

  button {
    width: 100%;
    background-color: #4caf50;
    color: white;
    font-size: 18px;
    padding: 14px 20px;
    margin: 12px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:disabled {
      cursor: unset;
      background-color: #c8c8c8;

      &:hover {
        cursor: unset;
        background-color: #c8c8c8;
      }
    }

    &:hover {
      background-color: #45a049;
    }
  }
</style>
