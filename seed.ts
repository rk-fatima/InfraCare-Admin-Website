import { db } from './src/lib/firebase';
import { collection, getDocs, deleteDoc, doc, setDoc } from 'firebase/firestore';

const mockIssues = [
  {
    id: 'IC0314',
    title: 'Pothole(Place holder) Sector 4',
    description: 'Major pothole detected on Sector 4 main road.',
    priority: 'medium',
    status: 'in-progress',
    lat: 28.6139,
    lng: 77.2090,
    createdAt: '2026-06-02T08:00:00.000Z',
    locationName: '7 tombs Raod, Tolichowki'
  },
  {
    id: 'IC0315',
    title: 'Flooding(Place holder)',
    description: 'Severe stagnation/flooding of rainwater on the lanes.',
    priority: 'high',
    status: 'resolved',
    lat: 28.6250,
    lng: 77.2200,
    createdAt: '2026-05-23T10:00:00.000Z',
    locationName: 'Tilak Road'
  },
  {
    id: 'IC0316',
    title: 'Water Leakage',
    description: 'Major pipeline supply failure causing leak.',
    priority: 'medium',
    status: 'in-progress',
    lat: 28.5900,
    lng: 77.2100,
    createdAt: '2026-05-15T14:30:00.000Z',
    locationName: 'Near Ice Magic,Mehdipatnam'
  },
  {
    id: 'IC0317',
    title: 'Streetlight Malfunction',
    description: 'Broken power supply board affecting lamp posts.',
    priority: 'low',
    status: 'resolved',
    lat: 28.6180,
    lng: 77.2050,
    createdAt: '2026-04-10T09:15:00.000Z',
    locationName: 'PIllar number 123, Attapur'
  },
  {
    id: 'IC0318',
    title: 'Manhole Restoration Required',
    description: 'Uncovered open chamber posing a risk near commercial hub.',
    priority: 'high',
    status: 'resolved',
    lat: 28.6050,
    lng: 77.2180,
    createdAt: '2026-03-22T16:45:00.000Z',
    locationName: '7 tombs Raod, Tolichowki'
  }
];

const mockWorkers = [
  { id: 'worker_1', name: 'Nikhil Reddy', isAvailable: false },
  { id: 'worker_2', name: 'Rohan Saxena', isAvailable: false },
  { id: 'worker_3', name: 'Karan Kapoor', isAvailable: true },
  { id: 'worker_4', name: 'Siddharth Sen', isAvailable: true },
  { id: 'worker_5', name: 'Meera Nair', isAvailable: true }
];

const mockAssignments = [
  { id: 'asgn_1', workerId: 'worker_1', issueId: 'IC0314', assignedAt: '2026-06-02T11:00:00.000Z' },
  { id: 'asgn_2', workerId: 'worker_2', issueId: 'IC0316', assignedAt: '2026-05-15T15:00:00.000Z' }
];

export async function seedDatabase() {
  console.log('Resetting and seeding database for user preference...');
  
  // 1. Clear current Issues
  const issuesSnap = await getDocs(collection(db, 'issues'));
  for (const docDetail of issuesSnap.docs) {
    await deleteDoc(doc(db, 'issues', docDetail.id));
  }
  
  // 2. Clear current Workers
  const workersSnap = await getDocs(collection(db, 'workers'));
  for (const docDetail of workersSnap.docs) {
    await deleteDoc(doc(db, 'workers', docDetail.id));
  }

  // 3. Clear current Assignments
  const assignmentsSnap = await getDocs(collection(db, 'assignments'));
  for (const docDetail of assignmentsSnap.docs) {
    await deleteDoc(doc(db, 'assignments', docDetail.id));
  }

  // 4. Seed new Issues
  for (const issue of mockIssues) {
    const { id, ...data } = issue;
    await setDoc(doc(db, 'issues', id), data);
  }

  // 5. Seed new Workers
  for (const worker of mockWorkers) {
    const { id, ...data } = worker;
    await setDoc(doc(db, 'workers', id), data);
  }

  // 6. Seed new Assignments
  for (const assignment of mockAssignments) {
    const { id, ...data } = assignment;
    await setDoc(doc(db, 'assignments', id), data);
  }

  console.log('Database successfully re-seeded!');
}
