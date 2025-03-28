// enum CanPlayTypeResult { "" /* empty string */, "maybe", "probably" };
// typedef (MediaStream or MediaSource or Blob) MediaProvider;

// [Exposed=Window]
// interface HTMLMediaElement : HTMLElement {

//   // error state
//   readonly attribute MediaError? error;

//   // network state
//   [CEReactions] attribute USVString src;
//   attribute MediaProvider? srcObject;
//   readonly attribute USVString currentSrc;
//   [CEReactions] attribute DOMString? crossOrigin;
//   const unsigned short NETWORK_EMPTY = 0;
//   const unsigned short NETWORK_IDLE = 1;
//   const unsigned short NETWORK_LOADING = 2;
//   const unsigned short NETWORK_NO_SOURCE = 3;
//   readonly attribute unsigned short networkState;
//   [CEReactions] attribute DOMString preload;
//   readonly attribute TimeRanges buffered;
//   undefined load();
//   CanPlayTypeResult canPlayType(DOMString type);

//   // ready state
//   const unsigned short HAVE_NOTHING = 0;
//   const unsigned short HAVE_METADATA = 1;
//   const unsigned short HAVE_CURRENT_DATA = 2;
//   const unsigned short HAVE_FUTURE_DATA = 3;
//   const unsigned short HAVE_ENOUGH_DATA = 4;
//   readonly attribute unsigned short readyState;
//   readonly attribute boolean seeking;

//   // playback state
//   attribute double currentTime;
//   undefined fastSeek(double time);
//   readonly attribute unrestricted double duration;
//   object getStartDate();
//   readonly attribute boolean paused;
//   attribute double defaultPlaybackRate;
//   attribute double playbackRate;
//   attribute boolean preservesPitch;
//   readonly attribute TimeRanges played;
//   readonly attribute TimeRanges seekable;
//   readonly attribute boolean ended;
//   [CEReactions] attribute boolean autoplay;
//   [CEReactions] attribute boolean loop;
//   Promise<undefined> play();
//   undefined pause();

//   // controls
//   [CEReactions] attribute boolean controls;
//   attribute double volume;
//   attribute boolean muted;
//   [CEReactions] attribute boolean defaultMuted;

//   // tracks
//   [SameObject] readonly attribute AudioTrackList audioTracks;
//   [SameObject] readonly attribute VideoTrackList videoTracks;
//   [SameObject] readonly attribute TextTrackList textTracks;
//   TextTrack addTextTrack(TextTrackKind kind, optional DOMString label = "", optional DOMString language = "");
// };
