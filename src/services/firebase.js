import { auth, db } from '../lib/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from 'firebase/auth';
import {
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
} from 'firebase/firestore';

export const Auth = {
  signInWithEmailAndPassword,
  signOut,
};

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

export async function doesUsernameExist(username) {
  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('username', '==', username));
  const result = await getDocs(q);

  return result.docs.length > 0;
}

export async function getUserByUsername(username) {
  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('username', '==', username));
  const result = await getDocs(q);

  return result.docs.length > 0 ? result.docs[0].data() : false;
}

export async function getUserById(userId) {
  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('userId', '==', userId));
  const result = await getDocs(q);

  return result.docs[0].data();
}

export async function isUserFollowingProfile(loggedInUserId, profileUserId) {
  const usersRef = collection(db, 'users');
  const q = query(
    usersRef,
    where('userId', '==', loggedInUserId),
    where('following', 'array-contains', profileUserId)
  );
  const result = await getDocs(q);

  return result.docs.length > 0;
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

export async function getPhotos(userId, following) {
  const photosRef = collection(db, 'photos');
  const q = query(photosRef, where('userId', 'in', following));
  const result = await getDocs(q);

  const userFollowedPhotos = result.docs.map((photo) => ({ ...photo.data() }));

  const photosWithUserDetails = await Promise.all(
    userFollowedPhotos.map(async (photo) => {
      let userLikedPhoto = false;
      if (photo.likes.includes(userId)) {
        userLikedPhoto = true;
      }

      return { ...photo, userLikedPhoto };
    })
  );

  return photosWithUserDetails;
}

export async function getPhotosByUserId(userId) {
  const photosRef = collection(db, 'photos');
  const q = query(photosRef, where('userId', '==', userId));
  const result = await getDocs(q);

  const photos = result.docs.map((photo) => ({ ...photo.data() }));
  return photos;
}

export async function updatePhotoLikes(photoId, userId, isLiked) {
  const photoRef = doc(db, 'photos', photoId);

  await updateDoc(photoRef, {
    likes: isLiked ? arrayRemove(userId) : arrayUnion(userId),
  });
}

export async function addPhotoComment(photoId, displayName, comment) {
  const photoRef = doc(db, 'photos', photoId);

  await updateDoc(photoRef, {
    comments: arrayUnion({ displayName, comment }),
  });
}
