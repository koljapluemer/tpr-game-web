<template>
  <main class="flex flex-col gap-4 flex-center p-10 max-w-lg mx-auto w-full">
    <router-view />
  </main>

  <footer class="border-t-2 mt-10 p-4 text-sm flex justify-center flex-col w-full">
    <!-- Twitter Share Button -->
    <!-- <a
      href="https://twitter.com/share?url=https://location.koljapluemer.com/"
      target="_blank"
      rel="noopener"
      class="underline"
    >
      <i class="fab fa-twitter share-icon"></i> Share on Twitter/X
    </a> -->

    <!-- Reddit Share Button -->
    <!-- <a
      href="https://www.reddit.com/submit?url=https://location.koljapluemer.com/"
      target="_blank"
      rel="noopener"
      class="underline"
    >
      <i class="fab fa-reddit share-icon"></i> Share on Reddit
    </a> -->

    <a href="mailto:feedback@koljapluemer.com" class="underline">Give Feedback</a>
    <span
      >More at
      <a class="underline" href="https://koljapluemer.com/">koljapluemer.com</a></span
    >
    <hr class="m-2" />
    <router-link to="/main" class="underline">Home</router-link>
    <!-- <router-link to="/about" class="underline">About</router-link> -->
  </footer>
</template>
