<template>
  <div class="bg-gray-50 dark:bg-gray-900">
    <div class="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
      <div class="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0 dark:border dark:border-gray-700 dark:bg-gray-800">
        <div class="space-y-4 p-6 sm:p-8 md:space-y-6">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            {{ title }}
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="register">
            <div>
              <label for="email" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                {{ emailPlaceholder }}
              </label>
              <input
                v-model="credentials.email"
                type="email"
                name="email"
                id="email"
                class="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                :placeholder="emailPlaceholder"
                required />
            </div>
            <div>
              <label for="password" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                {{ passwordPlaceholder }}
              </label>
              <input
                v-model="credentials.password"
                type="password"
                name="password"
                id="password"
                :placeholder="passwordPlaceholder"
                class="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                required />
            </div>
            <div>
              <label for="confirm-password" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                {{ confirmPasswordPlaceholder }}
              </label>
              <input
                v-model="credentials.confirmPassword"
                type="password"
                name="confirm-password"
                id="confirm-password"
                :placeholder="confirmPasswordPlaceholder"
                class="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                required />
            </div>
            <div class="flex items-start">
              <div class="flex h-5 items-center">
                <input
                  v-model="credentials.acceptTerms"
                  id="terms"
                  aria-describedby="terms"
                  type="checkbox"
                  class="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                  required />
              </div>
              <div class="ml-3 text-sm">
                <label for="terms" class="font-light text-gray-500 dark:text-gray-300">
                  {{ termsText }}
                  <a class="text-primary-600 dark:text-primary-500 font-medium hover:underline" href="#">
                    {{ termsLinkText }}
                  </a>
                </label>
              </div>
            </div>
            <button
              type="submit"
              class="w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium capitalize text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              {{ buttonText }}
            </button>
            <slot name="sign-in">
              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                {{ signInText }}
                <a href="#" class="text-primary-600 dark:text-primary-500 font-medium hover:underline">
                  {{ signInLinkText }}
                </a>
              </p>
            </slot>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['error', 'register']);

const props = defineProps({
  title: {
    type: String,
    default: 'Create an account'
  },
  emailPlaceholder: {
    type: String,
    default: 'Email'
  },
  passwordPlaceholder: {
    type: String,
    default: 'Password'
  },
  confirmPasswordPlaceholder: {
    type: String,
    default: 'Confirm password'
  },
  buttonText: {
    type: String,
    default: 'Create account'
  },
  termsText: {
    type: String,
    default: 'I accept the'
  },
  termsLinkText: {
    type: String,
    default: 'Terms and Conditions'
  },
  signInText: {
    type: String,
    default: 'Already have an account?'
  },
  signInLinkText: {
    type: String,
    default: 'Login here'
  },
  registerFn: {
    type: Function,
    required: true
  }
});

const credentials = ref({
  email: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false
});

const register = () => {
  if (!credentials.value.email || !credentials.value.password || !credentials.value.confirmPassword) {
    emit('error', 'All fields are required');
    return;
  }

  if (credentials.value.password !== credentials.value.confirmPassword) {
    emit('error', 'Passwords do not match');
    return;
  }

  if (!credentials.value.acceptTerms) {
    emit('error', 'You must accept the terms and conditions');
    return;
  }

  try {
    props.registerFn(credentials.value);
  } catch (error) {
    emit('error', error.message);
  }
};
</script>
