/**
 * Share to Facebook with custom quote
 * @param quote The quote text to share (usually the idea text)
 */
export const shareToFacebook = (quote: string): void => {
  try {
    // Create a formatted quote for social media
    const formattedText = `"${quote}"\n\n#มี10000บาทจะทำอะไรดี #WhatWouldYouDo`;

    // Set sharing URL
    const shareUrl = "https://what-would-you-do-10000-baht.web.app/";

    // Simple approach - only use the quote parameter without extra URL parameters
    // This is more likely to work consistently across devices
    const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      shareUrl
    )}&quote=${encodeURIComponent(formattedText)}`;

    // Open Facebook share dialog in a popup window
    window.open(
      fbShareUrl,
      "facebook-share-dialog",
      "width=626,height=436,scrollbars=yes"
    );
  } catch (error) {
    console.error("Error sharing to Facebook:", error);
    throw error;
  }
};
