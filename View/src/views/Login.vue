<template>
  <div class="grid w-screen h-screen place-items-center bg-slate-50">
    <div
      class="transition p-1 m-4 rounded bg-gradient-to-tr from-sky-400 via-amber-400 to-fuchsia-500 drop-shadow-md"
    >
      <div
        class="p-8 rounded bg-slate-200 bg-opacity-90 flex flex-col justify-center items-center"
      >
        <form class="flex flex-col text-lg font-light">
          <label name="email">Email address</label>
          <input
            class="p-1 rounded transition border hover:bg-slate-100 focus:bg-slate-100 focus:outline-none"
            type="email"
            name="email"
          />
          <label name="password">Password</label>
          <input
            class="p-1 rounded transition border hover:bg-slate-100 focus:bg-slate-100 focus:outline-none"
            type="password"
            name="password"
          />
          <input
            class="bg-fuchsia-500 my-4 p-1 rounded text-white transition cursor-pointer hover:scale-105"
            type="submit"
            value="Sign in"
          />
        </form>
        <div class="mt-4">
          Don't have an account?
          <router-link class="text-blue-600" to="/register"
            >Register here</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>
