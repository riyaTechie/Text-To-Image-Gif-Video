import React, {  useEffect } from 'react';

const ImageGallery = ({ selectedImage, setSelectedImage, aspectRatio }) => {

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') setSelectedImage(null);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    return (
        <>

            {selectedImage && (
                <div
                    className="popup-overlay"
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: 'rgba(0,0,0,0.6)',
                        backdropFilter: 'blur(8px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000,
                    }}
                >
                    <div style={{
                        height: '80%',
                        aspectRatio: aspectRatio,
                        position: "relative"
                    }}>
                        <div style={{
                            position: "absolute",
                            right: "5px",
                            top: "5px",
                            display: "flex",
                            alignItems: "center",
                            gap: "12px"
                        }}>
                            <a href={selectedImage}
                            download={`generated-image.png`}
                                onClick={(e) => {
                                    e.stopPropagation()
                                }} 
                                style={{
                                    backgroundColor: "#242424",
                                    padding: "0.3rem",
                                    borderRadius: "5px"
                                    , display: "flex"
                                    , alignItems: "center"
                                    , justifyContent: "center",
                                    cursor: "pointer"
                                }}>
                                <img src="src/assets/download.png" alt="download img" style={{
                                    height: "28px"
                                }} />
                            </a>
                            <p style={{
                                backgroundColor: "#242424",
                                padding: "0.3rem",
                                fontSize: "20px",
                                borderRadius: "5px"
                                , display: "flex"
                                , alignItems: "center"
                                , justifyContent: "center",
                                cursor: "pointer"
                            }}
                                onClick={() => setSelectedImage(null)}

                            >
                                <img src="src/assets/close.png" alt="download img" style={{
                                    height: "28px"
                                }} />
                            </p>
                        </div>
                        <img
                            src={selectedImage}
                            alt="Popup View"
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",

                                borderRadius: '12px',
                                boxShadow: '0 0 30px rgba(0,0,0,0.5)',
                            }}
                        />
                    </div>

                </div>
            )}
        </>
    );
};

export default ImageGallery;
