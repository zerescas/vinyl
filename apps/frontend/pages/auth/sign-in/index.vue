<script setup lang="ts">
const { signIn: _signIn } = useAuth();
const { createField, validateAll } = useValidate();

const serverError = ref<string | undefined>("");
const usernameField = createField<string>().notEmpty("Username is empty!");
const passwordField = createField<string>().notEmpty("Password is empty!");

async function signIn() {
  serverError.value = "";

  if (validateAll()) {
    return;
  }

  const { error } = await _signIn(usernameField.value!, passwordField.value!);
  if (error.value) {
    serverError.value = error.value.data.message;
  }
}
</script>

<template>
  <AuthForm>
    <template #headerContent>
      <h1>Sign In</h1>
    </template>

    <template #formContent>
      <AppInputGroup>
        <AppInputText
          label="Username"
          :isError="usernameField.isError"
          :error="usernameField.error"
          v-model="usernameField.value"
        />
        <AppInputPassword
          label="Password"
          :isError="passwordField.isError"
          :error="passwordField.error"
          v-model="passwordField.value"
        />
      </AppInputGroup>

      <AuthFormButton type="submit" @click.prevent="signIn()">
        Sign In
      </AuthFormButton>

      <AppBaseInputError>
        {{ serverError }}
      </AppBaseInputError>
    </template>
  </AuthForm>
</template>
