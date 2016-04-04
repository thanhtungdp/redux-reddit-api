import 'isomorphic-fetch';
import 'babel-polyfill'

export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT';
export function selectSubreddit(subreddit) {
    return {
        type: SELECT_SUBREDDIT,
        subreddit
    }
}

export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT';
export function invalidateSubreddit(subreddit) {
    return {
        type: INVALIDATE_SUBREDDIT,
        subreddit
    }
}

export const REQUEST_POSTS = 'REQUEST_POSTS';
export function requestPosts(subreddit) {
    return {
        type: REQUEST_POSTS,
        subreddit
    }
}

export function fetchPosts(subreddit) {
    return function (dispatch) {
        dispatch(requestPosts(subreddit));
        return fetch(`http://www.reddit.com/r/${subreddit}.json`)
            .then(response=>response.json())
            .then(json=> {
                return dispatch(receivePosts(subreddit, json));
            })
    }
}

export function shouldFetchPosts(state, subreddit) {
    const posts = state.postsBySubreddit[subreddit];
    if (!posts) {
        return true;
    }
    else if (posts.isFetching) {
        return false;
    }
    else {
        return posts.didInvalidate;
    }
}

export function fetchPostsIfNeeded(subredddit) {
    return (dispatch, getState)=> {
        if (shouldFetchPosts(getState(), subredddit)) {
            return dispatch(fetchPosts(subredddit));
        } else {
            return Promise.resolve();
        }
    }
}

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export function receivePosts(subreddit, json) {
    return {
        type: RECEIVE_POSTS,
        subreddit,
        posts: json.data.children.map(child=>child.data),
        receivedAt: Date.now()
    }
}