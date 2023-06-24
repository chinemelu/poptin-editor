<template>
  <div class="canvas">
    <div class="canvas__outer-circle">
      <div class="canvas__inner-circle">
        <div class="canvas__star-container">
          <span class="canvas__star canvas__star--sm"></span>
          <span class="canvas__star canvas__star--md"></span>
          <span class="canvas__star canvas__star--sm"></span>
        </div>
        <div class="canvas__inner-circle-content">
          <div class="canvas__text-container">
            <p class="canvas__text">All the text and elements in this popup should be editable and dragable</p>
          </div>
          <BaseInput placeholder="E-mail" inputClass="canvas__input" />
          <BaseButton 
            buttonClass="canvas__button"
          >
            signup now
          </BaseButton>
          <div class="canvas__text-container">
            <p class="canvas__mini-text">No credit card required. No surprises</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BaseInput from '@/components/BaseInput'
  import BaseButton from '@/components/BaseButton'
  export default {
    components: {
      BaseInput,
      BaseButton
    }
  }
</script>

<style>
.canvas {
  background-color: #fff;
  max-width: 90rem;
  height: 60rem;
  margin: 5rem auto;
}

.canvas__outer-circle {
  position: relative;
  max-width: 50rem;
  height: 50rem;
  margin: 0 auto;
  background-color: #E85E5B;
  border-radius: 50%;
  top: 50%;
  transform: translateY(-50%);
}

.canvas__inner-circle {
  max-width: 48rem;
  height: 48rem;
  background-color: #E85E5B;
  border: 2px solid #fff;
  position: relative;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  padding: 3rem 0;
}

.canvas__inner-circle-content {
  max-width: 60%;
  margin: 0 auto;
  text-align: center;
}

.canvas__star-container {
  position: relative;
  display: flex;
  justify-content: space-between;
  max-width: 30%;
  margin: 0 auto;
}

.canvas__star--sm {
  width: 3rem;
  height: 3rem;
  font-size: 3rem;
}

.canvas__star--sm::before {
  top: 0;
}
.canvas__star--md::before {
  bottom: 0;
}

.canvas__star::before {
  content: '\2605';
  position: absolute;
  color: #CB3735;
}

.canvas__star {
  position: relative;
}

.canvas__star--md {
  width: 4rem;
  height: 4rem;
  font-size: 4rem;
}

.canvas__text-container {
  text-align: center;
  margin: 2rem auto 0 auto;
}
.canvas__text {
  color: #fff;
  font-size: 2rem;
  font-weight: 500;
}
.canvas__mini-text {
  color: #fff;
  font-size: 1.5rem;
}
.canvas__input {
  width: 100%;
  margin-top: 2rem;
}
.canvas__button {
  background-color: #000;
  color: #fff;
  padding: 1.5rem 2rem;
  width: 100%;
  margin-top: 2rem;
  border-radius: 1rem; 
  font-weight: 600;
  font-size: 2rem;
  text-transform: uppercase;
}
</style>