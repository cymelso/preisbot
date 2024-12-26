// Generate milestones from 0.0001 to 1.0000 in steps
function generateMilestones() {
  const milestones = [];
  
  // Add milestones from 0.0001 to 0.001 in 0.0001 steps
  for (let i = 1; i <= 10; i++) {
    milestones.push(i / 10000);
  }
  
  // Add milestones from 0.001 to 0.01 in 0.001 steps
  for (let i = 1; i <= 10; i++) {
    milestones.push(i / 1000);
  }
  
  // Add milestones from 0.01 to 0.1 in 0.01 steps
  for (let i = 1; i <= 10; i++) {
    milestones.push(i / 100);
  }
  
  // Add milestones from 0.1 to 1.0 in 0.1 steps
  for (let i = 1; i <= 10; i++) {
    milestones.push(i / 10);
  }
  
  return milestones.sort((a, b) => a - b);
}

const PRICE_MILESTONES = generateMilestones();

module.exports = { PRICE_MILESTONES };