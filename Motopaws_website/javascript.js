// JavaScript in script.js

document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");

  const updateCounter = (counter) => {
    // '+' converts the string attribute value to a number
    const target = +counter.getAttribute("data-target");
    // Get the suffix (like '%' for the accident reduction stat)
    const suffix = counter.getAttribute("data-suffix") || "";
    let currentCount = 0;

    // Duration of the animation in milliseconds
    const duration = 2000;

    // Calculate the increment step
    const step = target / (duration / 10);

    const count = () => {
      if (currentCount < target) {
        currentCount += step;
        // Display the number with thousand separators, rounded up, and add the suffix
        counter.innerText =
          Math.ceil(currentCount).toLocaleString("en-IN") + suffix;
        requestAnimationFrame(count);
      } else {
        // Ensure the final target number is displayed exactly
        counter.innerText = target.toLocaleString("en-IN") + suffix;
      }
    };

    count();
  };

  // Intersection Observer for triggering animation when element enters viewport
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          updateCounter(entry.target);
          // Stop observing once the animation is triggered
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.5, // Trigger when 50% of the element is visible
    }
  );

  // Start observing each counter
  counters.forEach((counter) => {
    // Initialize the display to '0'
    const initialSuffix = counter.getAttribute("data-suffix") || "";
    counter.innerText = "0" + initialSuffix;
    observer.observe(counter);
  });
});
