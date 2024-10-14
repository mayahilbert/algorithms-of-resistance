function setupVideo() {
    // get video
    var video = document.getElementById('myVideo')
    // Play the video, this is optional
    video.play();
    // Add a listener to this video, so that when the video ends, the video is "hidden".
}
document.addEventListener('DOMContentLoaded', e => {
    var video = document.getElementById("myVideo");
    var video2 = document.getElementById("myVideo2");
    var main = document.getElementById("main-content");

    if (video != null) {
        video.addEventListener('click', e => {
            video.style.display = "none";
            video2.style.display = "block";
            video2.play();

            //video.style.opacity = "0";
            //setTimeout(() => {
            //    video.style.display = "none";
            //}, 250);
            setTimeout(() => {
                video2.style.opacity = "0";
                setTimeout(() => {
                    video2.style.display = "none";
                }, 250); main.classList.add("loaded");

            }, 1000);

        });
    }
});