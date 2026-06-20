const resultPage = document.querySelector("#results-view");

document
  .querySelector("#btn-submit-sidebar")
  .addEventListener("click", submitExam);

function submitExam() {
  let correct = 0;
  let incorrect = 0;
  let unanswered = 0;

  const correctQues =
    document.querySelector("#res-questions");

  correctQues.innerHTML = "";

  questions.forEach((question, i) => {
    const userAnswer = userAnswers[i];

    let status = "";
    let badgeClass = "";

    if (userAnswer === null) {
      unanswered++;
      status = "Unanswered";
      badgeClass = "warning";
    } else if (
      userAnswer === question.correctAnswer
    ) {
      correct++;
      status = "Correct";
      badgeClass = "success";
    } else {
      incorrect++;
      status = "Incorrect";
      badgeClass = "danger";
    }

    correctQues.innerHTML += `
      <div class="card mb-3 border-${badgeClass}">
        <div class="card-body">

          <div class="d-flex justify-content-between">
            <h6 class="fw-bold">
              Question ${i + 1}
            </h6>

            <span class="badge bg-${badgeClass}">
              ${status}
            </span>
          </div>

          <p class="mt-2 mb-2">
            ${question.question}
          </p>

          <p>
            <strong>Your Answer:</strong>
            ${userAnswer || "Not Attempted"}
          </p>

          <p class="text-success">
            <strong>Correct Answer:</strong>
            ${question.correctAnswer}
          </p>

          <p class="text-muted">
            ${question.explanation}
          </p>

        </div>
      </div>
    `;
  });

  const percentage =
    ((correct / TOTAL_QUESTIONS) * 100).toFixed(1);

  document.querySelector(
    "#res-score-progressbar"
  ).style.width = `${percentage}%`;

  document.querySelector(
    "#res-score-ratio"
  ).textContent = correct;

  document.querySelector(
    "#res-score-percent"
  ).textContent = `${percentage}%`;

  document.querySelector(
    "#res-progress-pct"
  ).textContent = `${percentage}%`;

  let grade = "F";

  if (correct > 20) grade = "A";
  else if (correct > 15) grade = "B";
  else if (correct > 10) grade = "C";
  else if (correct > 5) grade = "D";

  document.querySelector(
    "#res-grade-badge"
  ).textContent = `Grade ${grade}`;

  document.querySelector(
    "#res-correct-val"
  ).textContent = correct;

  document.querySelector(
    "#res-incorrect-val"
  ).textContent = incorrect;

  document.querySelector(
    "#res-unanswered-val"
  ).textContent = unanswered;

  document.querySelector(
    "#res-correct-pct"
  ).textContent = `${(
    (correct / TOTAL_QUESTIONS) *
    100
  ).toFixed(1)}% of total`;

  document.querySelector(
    "#res-incorrect-pct"
  ).textContent = `${(
    (incorrect / TOTAL_QUESTIONS) *
    100
  ).toFixed(1)}% of total`;

  document.querySelector(
    "#res-unanswered-pct"
  ).textContent = `${(
    (unanswered / TOTAL_QUESTIONS) *
    100
  ).toFixed(1)}% of total`;

  clearInterval(timerInterval);

  document
    .querySelector("#exam-view")
    .classList.remove("active");

  document
    .querySelector("#results-view")
    .classList.add("active");
}