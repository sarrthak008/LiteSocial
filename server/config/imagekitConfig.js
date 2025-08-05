import ImageKit from "imagekit";

const imageKitConfig = () => {
    try {
        let imagekit = new ImageKit({
            publicKey: `${process.env.IMGKIT_PUBLIC_KEY}`,
            privateKey: `${process.env.IMGKIT_PRIVATE_KEY}`,
            urlEndpoint: "https://ik.imagekit.io/liteSocial"
        })
        return imagekit

    } catch (error) {
        console.log(error.message);
    }
}

export default imageKitConfig;