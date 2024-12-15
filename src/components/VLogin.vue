<template>
  <div
    class="mt-0 w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md
      xl:p-0">
    <div class="space-y-4 p-6 sm:p-8 md:space-y-6">
      <h1
        class="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
        {{ title }}
      </h1>
      <form @submit.prevent="onLogin">
        <div class="space-y-4">
          <div>
            <v-input
              v-model="email"
              type="text"
              placeholder="name@company.com"
              label="Your email"
              :variant="emailError ? 'danger' : 'default'"
              :shortErrorMessage="emailError" />
          </div>
          <div>
            <v-input
              v-model="password"
              type="password"
              placeholder="••••••••"
              label="Password"
              :variant="passwordError ? 'danger' : 'default'"
              :shortErrorMessage="passwordError" />
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-start">
              <slot name="remember-me"></slot>
            </div>
          </div>
          <v-button
            type="submit"
            variant="primary"
            class="w-full">
            {{ buttonText }}
          </v-button>
        </div>
      </form>
      <div class="mt-4 text-right">
        <slot
          name="forgot-password"
          v-if="forgottenPasswordFn !== null">
          <v-button
            type="button"
            variant="link"
            tabindex="-1"
            @click.prevent.stop="forgottenPasswordFn">
            {{ forgotPasswordText }}
          </v-button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, watch } from 'vue';
  import VButton from './VButton.vue';
  import VInput from './VInput.vue';

  const props = defineProps({
    title: {
      type: String,
      default: 'Login'
    },
    emailPlaceholder: {
      type: String,
      default: 'Email'
    },
    passwordPlaceholder: {
      type: String,
      default: 'Password'
    },
    buttonText: {
      type: String,
      default: 'Login'
    },
    forgotPasswordText: {
      type: String,
      default: 'Forgot password?'
    },
    loginFn: {
      type: Function,
      required: true
    },
    forgottenPasswordFn: {
      type: Function,
      default: null
    }
  });

  const email = ref('');
  const password = ref('');
  const emailError = ref('');
  const passwordError = ref('');

  watch(email, () => {
    emailError.value = '';
  });

  watch(password, () => {
    passwordError.value = '';
  });

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const onLogin = (e) => {
    e.preventDefault();

    emailError.value = '';
    passwordError.value = '';

    if (!email.value) {
      emailError.value = 'Email is required';
      return;
    }
    if (!validateEmail(email.value)) {
      emailError.value = 'Please enter a valid email';
      return;
    }

    if (!password.value) {
      passwordError.value = 'Password is required';
      return;
    }

    props.loginFn({ email: email.value, password: password.value });
  };
</script>
