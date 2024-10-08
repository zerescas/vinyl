<script setup lang="ts">
import IcRoundArrowBack from "~icons/ic/round-arrow-back";

const { signUp } = useAuth();

// Steps
const steps = reactive({
  structure: {
    initial: 0,
    password: 1,
    bio: 2,
  },
  current: 0,
  count: 0,
});
steps.count = Object.keys(steps).length - 1;

const isShowSteps = computed(() => steps.current > 0);
const isFinalStep = computed(() => steps.current >= steps.count);
const isStepForward = ref(true);

function previousStep() {
  steps.current--;
  isStepForward.value = false;
}

async function nextStep() {
  serverError.value = "";
  let validationFunc: () => boolean = () => false;

  switch (steps.current) {
    case steps.structure.initial:
      validationFunc = () => validateSome([usernameField, emailField]);
      break;

    case steps.structure.password:
      validationFunc = () => validateSome([passwordField]);
      break;

    case steps.structure.bio:
      validationFunc = () => validateSome([nameField]);
      break;
  }

  if (validationFunc()) {
    return;
  }

  if (!isFinalStep.value) {
    steps.current++;
    isStepForward.value = true;
    return;
  }

  const { error } = await signUp({
    username: usernameField.value!,
    email: emailField.value!,
    password: passwordField.value!,
    name: nameField.value!,
    lastName: lastNameField.value!,
  });
  if (error.value) {
    serverError.value = error.value.data.message;
  }
}

// Field validation setup
const { createField, validateSome } = useValidate();

const serverError = ref<string | undefined>("");

const usernameField = createField<string>().notEmpty("Username is empty!");

const emailField = createField<string>()
  .notEmpty("Email is empty!")
  .enforce((value) => {
    if (!value?.includes("@")) return "Incorrect email";
  });

const passwordField = createField<string>()
  .notEmpty("Password is empty!")
  .min(8, "Password is less than 8 characters!");

const nameField = createField<string>().notEmpty("Name is empty!");
const lastNameField = createField<string>();
</script>

<template>
  <AuthForm>
    <template #headerContent>
      <div class="flex items-center gap-4">
        <IcRoundArrowBack
          v-if="isShowSteps"
          class="ease size-7 translate-y-0.5 cursor-pointer text-zinc-200 transition-colors duration-300 hover:text-zinc-50"
          @click="previousStep"
        />

        <h1 v-if="!isShowSteps">Sign Up</h1>
        <div v-else>
          <span
            v-if="isShowSteps"
            class="text-lg font-semibold text-[--color-accent-950]"
          >
            Step {{ steps.current }} of {{ steps.count }}
          </span>

          <p class="-mt-1">
            <span v-if="steps.current === steps.structure.bio">
              Tell about yourself
            </span>
            <span v-if="steps.current === steps.structure.password">
              Create a password
            </span>
          </p>
        </div>
      </div>

      <div
        v-if="isShowSteps"
        class="h-1 bg-zinc-700"
        :class="{ 'drop-shadow-accent-md': isFinalStep }"
      >
        <div
          class="h-1 bg-[--color-accent-950]"
          :style="{ width: `${(steps.current / steps.count) * 100}%` }"
        ></div>
      </div>
    </template>

    <template #formContent>
      <Transition :name="isStepForward ? 'slide-fade' : 'slide-fade-reverse'">
        <div v-if="steps.current === steps.structure.initial">
          <AppInputGroup>
            <AppInputText
              label="Username"
              :isError="usernameField.isError"
              :error="usernameField.error"
              v-model="usernameField.value"
            />

            <AppInputText
              label="Email"
              :isError="emailField.isError"
              :error="emailField.error"
              v-model="emailField.value"
            />
          </AppInputGroup>
        </div>

        <div v-else-if="steps.current === steps.structure.password">
          <AppInputGroup>
            <AppInputPassword
              label="Password"
              :isError="passwordField.isError"
              :error="passwordField.error"
              v-model="passwordField.value"
            />
          </AppInputGroup>

          <p class="text-sm">
            Your password must contain at least 8 characters
          </p>
        </div>

        <div v-else-if="steps.current === steps.structure.bio">
          <AppInputGroup>
            <AppInputText
              label="Name"
              name="name"
              :isError="nameField.isError"
              :error="nameField.error"
              v-model="nameField.value"
            />

            <AppInputText label="Last Name" v-model="lastNameField.value" />
          </AppInputGroup>
        </div>
      </Transition>

      <AuthFormButton @click.prevent="nextStep">
        {{ isFinalStep ? "Sign Up" : "Next" }}
      </AuthFormButton>

      <AppBaseInputError>
        {{ serverError }}
      </AppBaseInputError>
    </template>
  </AuthForm>
</template>
