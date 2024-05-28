import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faPhoneVolume } from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import "../assets/contact-us.css";

const ContactUs = () => {
  return (
    <div className="container">
      <div className="wrap">
        <div className="contact-form">
          <h2>Contact Us</h2>
          <div className="form-space">
            <form>
              <div className=" icon-placeholder">
                <FontAwesomeIcon
                  color="coral"
                  className="plc-hldr"
                  icon={faUser}
                />
                <input type="text" placeholder="USERNAME" />
              </div>
              <div className=" icon-placeholder">
                <FontAwesomeIcon
                  color="coral"
                  className="plc-hldr"
                  icon={faEnvelope}
                />
                <input type="email" placeholder="E-MAIL" />
              </div>
              <div className=" icon-placeholder">
                <FontAwesomeIcon
                  color="coral"
                  className="plc-hldr"
                  icon={faPhoneVolume}
                />
                <input type="text" placeholder="PHONE" />
              </div>
              <div className="  icon-placeholder">
                <FontAwesomeIcon
                  color="coral"
                  className="plc-hldr"
                  icon={faMessage}
                />
                <textarea placeholder="MESSAGE"></textarea>
              </div>
              <button type="submit">
                <b>SEND</b>
              </button>
            </form>
          </div>
        </div>

        <div className="follow-us">
          <h2>Follow us</h2>
          {/* Add links to your social media profiles */}

          <a href="#" className="facebook">
            {/*me=margin end, ms= margin start*/}
            <FontAwesomeIcon className="me-2 ms-3" icon={faFacebookF} />
            Facebook
          </a>

          <a href="#" className="instagram">
            <FontAwesomeIcon className="me-2 ms-3" icon={faInstagram} />
            Instagram
          </a>
          <a href="#" className="twitter">
            <FontAwesomeIcon className="me-2 ms-3" icon={faTwitter} />
            Twitter
          </a>
          <a href="#" className="youtube">
            <FontAwesomeIcon className="me-2 ms-3" icon={faYoutube} />
            YouTube
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
