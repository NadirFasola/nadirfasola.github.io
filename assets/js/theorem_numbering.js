// assets/js/theorem_numbering.js

document.addEventListener('DOMContentLoaded', function() {
  const theoremEnvs = document.querySelectorAll('.theorem-env');
  // Stores independent counters for each type (e.g., {theorem: 0, definition: 0, exercise: 0})
  const theoremCounters = {};
  // Stores the mapping from label to generated number (e.g., {'thm:pythagorean': 'Theorem 1.1'})
  const labelToNumberMap = {};
  // Map data-type to its display prefix for cross-references
  const typePrefixMap = {
      'theorem': 'Theorem',
      'definition': 'Definition',
      'lemma': 'Lemma',
      'tip': 'Tip', // Tips are not numbered sequentially by JS, but included for consistent ref formatting
      'example': 'Example', // Examples are not numbered sequentially by JS, but included for consistent ref formatting
      'exercise': 'Exercise'
  };

  // Function to get the numerical part for display (e.g., "1", "2.1")
  // This function will *only* return the sequential counter for now.
  function getDisplayNumber(type, counter) {
      return `${counter}`;
  }

  // 1. First Pass: Assign Numbers and Build Label Map
  theoremEnvs.forEach(env => {
      const type = env.dataset.type; // 'theorem', 'definition', 'exercise', etc.
      const label = env.dataset.label; // 'thm:pythagorean'

      let displayNum = ''; // The number to put directly into the .theorem-label span (e.g., "1", "2")
      let fullRefString = ''; // The full string for cross-references (e.g., "Theorem 1", "Exercise 3")

      // Only increment counter and generate a display number if the type should be numbered
      if (['theorem', 'definition', 'lemma', 'exercise'].includes(type)) {
          if (!theoremCounters[type]) {
              theoremCounters[type] = 0;
          }
          theoremCounters[type]++;

          displayNum = getDisplayNumber(type, theoremCounters[type]); // Get just the number (e.g., "1")

          // Construct the full string for cross-references (e.g., "Theorem 1", "Exercise 3")
          const prefix = typePrefixMap[type] || (type.charAt(0).toUpperCase() + type.slice(1));
          fullRefString = `${prefix} ${displayNum}`;

      } else {
          // For types like 'tip' or 'example' that are not numbered sequentially,
          // their cross-reference string will just be their capitalized type (e.g., "Tip", "Example")
          fullRefString = typePrefixMap[type] || (type.charAt(0).toUpperCase() + type.slice(1));
      }

      // Update the HTML with the generated display number
      // Targetting the .theorem-label span that holds the data-label and will display the number
      const theoremLabelSpan = env.querySelector('.theorem-label');
      if (theoremLabelSpan) {
          // Only insert text if it's a numbered type, otherwise leave it empty (for Tip/Example)
          theoremLabelSpan.textContent = displayNum;
      }

      // Store the full formatted string for referencing
      if (label) {
          labelToNumberMap[label] = fullRefString;
      }
  });

  // 2. Second Pass: Resolve Cross-References
  const theoremRefs = document.querySelectorAll('.thm-ref');
  theoremRefs.forEach(ref => {
      const targetLabel = ref.dataset.targetLabel;
      if (targetLabel && labelToNumberMap[targetLabel]) {
          ref.textContent = labelToNumberMap[targetLabel];
      } else {
          // If label not found, show a placeholder or error
          ref.textContent = `[${targetLabel}?]`;
          console.warn(`Theorem reference target '${targetLabel}' not found.`);
      }
  });

  // Optional: If you use MathJax and dynamic content, call MathJax.typeset()
  MathJax.typeset(); // Uncomment if MathJax needs to re-process after JS changes content
});