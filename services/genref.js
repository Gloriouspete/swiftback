export default function generateReferralId() {
  // Helper function to generate a random capital letter
  function getRandomLetter() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return letters.charAt(Math.floor(Math.random() * letters.length));
  }

  // Helper function to generate a random number
  function getRandomNumber() {
    return Math.floor(Math.random() * 10); // Generates a number between 0 and 9
  }

  // Generate three random letters
  let lettersPart = "";
  for (let i = 0; i < 3; i++) {
    lettersPart += getRandomLetter();
  }

  // Generate six random numbers
  let numbersPart = "";
  for (let i = 0; i < 6; i++) {
    numbersPart += getRandomNumber();
  }

  // Concatenate letters and numbers to form the referral ID
  const referralId = lettersPart + numbersPart;
  return referralId;
}
