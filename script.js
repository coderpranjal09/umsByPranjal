function addMonth() {
  const container = document.getElementById('monthContainer');
  const monthForm = document.createElement('div');
  monthForm.className = 'month-form';
  monthForm.innerHTML = `
    <label>Month:</label>
    <select class="month-selector">
      <option value="January">January</option>
      <option value="February">February</option>
      <option value="March">March</option>
      <option value="April">April</option>
      <option value="May">May</option>
      <option value="June">June</option>
      <option value="July">July</option>
      <option value="August">August</option>
      <option value="September">September</option>
      <option value="October">October</option>
      <option value="November">November</option>
      <option value="December">December</option>
    </select>
    <label>Total Classes:</label>
    <input type="number" class="total-classes" placeholder="Total" min="0">
    <label>Attended Classes:</label>
    <input type="number" class="attended-classes" placeholder="Attended" min="0">
  `;
  container.appendChild(monthForm);
}

function calculateAttendance() {
  const totalClassesElements = document.querySelectorAll('.total-classes');
  const attendedClassesElements = document.querySelectorAll('.attended-classes');
  const monthSelectors = document.querySelectorAll('.month-selector');

  let totalClasses = 0;
  let attendedClasses = 0;
  let monthlyData = [];

  totalClassesElements.forEach((elem, index) => {
    const total = parseInt(elem.value) || 0;
    const attended = parseInt(attendedClassesElements[index].value) || 0;
    const month = monthSelectors[index].value;

    monthlyData.push({ month, total, attended });
    totalClasses += total;
    attendedClasses += attended;
  });

  const attendancePercentage = (attendedClasses / totalClasses) * 100;
  const alertBox = document.getElementById('alert');
  const monthlyAttendanceDiv = document.getElementById('monthly-attendance');
  alertBox.style.display = 'block';

  monthlyAttendanceDiv.innerHTML = "<h3>Monthly Attendance:</h3><ul>";
  monthlyData.forEach(data => {
    const monthlyPercentage = (data.attended / data.total) * 100;
    monthlyAttendanceDiv.innerHTML += `<li>${data.month}: ${monthlyPercentage.toFixed(2)}%</li>`;
  });
  monthlyAttendanceDiv.innerHTML += "</ul>";

  if (attendancePercentage < 75) {
    const requiredClasses = Math.ceil((0.75 * totalClasses - attendedClasses) / (1 - 0.75));
    alertBox.className = 'alert low';
    alertBox.innerHTML = `Total Attendance: ${attendancePercentage.toFixed(2)}%. You need to attend ${requiredClasses} more classes to maintain 75%.`;
  } else {
    const possibleClassesToSkip = Math.floor((attendedClasses - 0.75 * totalClasses) / 0.75);
    alertBox.className = 'alert high';
    alertBox.innerHTML = `Total Attendance: ${attendancePercentage.toFixed(2)}%. You can skip up to ${possibleClassesToSkip} classes and still maintain 75%.`;
  }
}
