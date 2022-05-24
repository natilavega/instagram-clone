import { Auth, Firestore } from '../lib/firebase';

const { auth, createUserWithEmailAndPassword, updateProfile } = Auth;
const { db, collection, doc, query, where, getDocs, setDoc } = Firestore;

export async function doesUsernameExist(username) {
  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('username', '==', username));
  const result = await getDocs(q);

  return result.docs.length > 0;
}

export async function createUser(email, password, username, fullName) {
  await createUserWithEmailAndPassword(auth, email, password).then(() => {
    updateProfile(auth.currentUser, {
      displayName: username,
    }).then(() =>
      createUserDoc(auth.currentUser.uid, username, fullName, email)
    );
  });
}

export async function createUserDoc(uid, username, fullName, email) {
  const docRef = doc(db, 'users', uid);

  setDoc(docRef, {
    userId: uid,
    username: username.toLowerCase(),
    fullName,
    email: email.toLowerCase(),
    following: [],
    dateCreated: Date.now(),
  });
}

export async function getAuthUser(userId) {
  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('userId', '==', userId));
  const result = await getDocs(q);

  return result.docs[0].data();
}
