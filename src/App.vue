<template>
  <router-view />
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Lato:300,400,400italic,700,700italic,900,900italic");

* {
  margin: 0;
  padding: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

body {
  display: flex;
  min-width: 320px;
  justify-content: center;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  background: #131417;
  color: #ffffff;
  user-select: none;
}

.container {
  .row:not(:first-child) {
    padding: 0.5em 0;
  }
}

form {
  > label {
    font-size: 1.3rem;
    position: relative;
    display: block;
    padding-bottom: 0.25em;
    font-weight: 300;
    font-family: "Lato", "Lucida Grande", "Lucida Sans Unicode", Tahoma,
      Sans-Serif;

    textarea,
    input {
      background: #252830;
      color: white;
      width: 100%;
      min-width: 100%;
      max-width: 100%;
      margin: 0;
      padding: 0.4em 0.4em 0.4em 0.4em;
      text-indent: 0.25em; 
      border: none;
      border-radius: 4px;
      font: inherit;

      &:focus {
        background: #2c303a;
        border-color: #aaaebc;
      }
    }
  }
}

#app {
  flex: 1;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  max-width: 45em;
  padding: 2.5em 0;
}

.btn {
  font-family: "Lato", "Lucida Grande", "Lucida Sans Unicode", Tahoma,
    Sans-Serif;
  -webkit-appearance: none;
  font-size: 1rem;
  text-shadow: none;
  line-height: 1.2;
  display: inline-block;
  padding: 10px 16px;
  margin: 0 10px 0 0;
  position: relative;
  border-radius: 4px;
  border: 3px solid transparent;
  background: #444857;
  color: white;
  cursor: pointer;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-decoration: none !important;
  text-align: center;
  font-weight: normal !important;

  &:hover {
    cursor: pointer;
    color: white;
    background: #5a6074;
  }

  &.btn-lg {
    width: 100%;
  }
}

h3,
h4 {
  font-family: "Lato", "Lucida Grande", "Lucida Sans Unicode", Tahoma,
    Sans-Serif;
}

h3 {
  color: #fff;
  margin-bottom: 0.625rem;
  font-size: 1.4rem;
  font-weight: bold;
  line-height: 1.2;
  margin: 0 0 10px 0;
}

h4 {
  color: #c7c9d3;
  text-transform: none;
  font-weight: 400;
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
}

ul.list {
  flex-basis: 50%;

  li {
    border-bottom: 1px solid #2c303a;
    border-radius: 4px;
    margin-bottom: -0.25rem;
    display: block;
    padding: 1.5rem 1rem 0.5rem;
    transform: scale(0.97);
    transition: transform 0.3s ease, background 0.3s ease;
    overflow: hidden;

    &:hover {
      background: #1e1f26;
      border-bottom-color: transparent;
      transform: scale(1);
      cursor: pointer;
      color: white;
    }
  }
}
</style>
