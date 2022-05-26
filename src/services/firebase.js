import { Auth, Firestore } from '../lib/firebase';

const { auth, createUserWithEmailAndPassword, updateProfile } = Auth;
const {
  db,
  collection,
  doc,
  query,
  where,
  limit,
  getDocs,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} = Firestore;

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

export async function getSuggestedProfiles(userId, following) {
  const usersRef = collection(db, 'users');
  let q;

  if (following.length > 0) {
    q = query(
      usersRef,
      where('userId', 'not-in', [...following, userId]),
      limit(10)
    );
  } else {
    q = query(usersRef, where('userId', '!=', userId), limit(10));
  }

  const result = await getDocs(q);
  const profiles = result.docs.map((user) => ({ ...user.data() }));
  return profiles;
}

export async function updateLoggedInUserFollowing(
  userId,
  profileId,
  isFollowing
) {
  const userRef = doc(db, 'users', userId);

  await updateDoc(userRef, {
    following: isFollowing ? arrayRemove(profileId) : arrayUnion(profileId),
  });
}

export async function updateFollowedUserFollowers(
  profileId,
  userId,
  isFollowed
) {
  const userRef = doc(db, 'users', profileId);

  await updateDoc(userRef, {
    followers: isFollowed ? arrayRemove(userId) : arrayUnion(userId),
  });
}
