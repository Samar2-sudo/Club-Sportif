// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Button, Menu } from 'antd'; // Added Menu component
import "../home.css";
const { Header, Footer, Content } = Layout;

const Home = () => {
  const location = useLocation();
  const userId = location.state?.userId || new URLSearchParams(location.search).get('userId');

  return (
    <Layout>
      <Header
        style={{
          display: 'flex',
          justifyContent: 'space-between', 
          alignItems: 'center',
          width: '100%',
          position: 'sticky',
          top: 0,
          zIndex: 1,
        }}
      >
        <div className="demo-logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} style={{ flex: 1, minWidth: 0 }}>
          {/* Your menu items here */}
        </Menu>
        <div>
          {userId && (
            <>
              <Link to={`/profile/${userId}`}>
                <Button type="default" style={{ marginRight: '8px' }}>Create Profile</Button>
              </Link>
              <Link to={`/profile/${userId}/display`}>
                <Button type="default">View Your Profile</Button>
              </Link>
              <div style={{ marginLeft: '8px', marginRight: '8px'}} />
            </>
          )}
        </div>
        <div>
          <Link to="/logout">
            <Button style={{ marginLeft: '8px'}}>Logout</Button>
          </Link>
        </div>
      </Header>
      <Content>
      <section className="u-clearfix u-grey-10 u-section-1" id="sec-550b">
      <div className="u-clearfix u-sheet u-sheet-1">
        <img className="custom-expanded u-image u-image-round u-radius u-image-1" src="club_sportif/images/R.jpeg" data-image-width="1380" data-image-height="920" />
        <div className="u-align-center u-container-align-center u-container-style u-custom-color-2 u-group u-opacity u-opacity-80 u-shape-circle u-group-1" data-animation-name="customAnimationIn" data-animation-duration="1500" data-animation-delay="500">
        <div className="u-container-layout u-container-layout-1" style={{ borderRadius: '50%', overflow: 'hidden' }}>
  <h1 className="u-align-center u-custom-font u-text u-text-1 animated customAnimationIn-played" data-animation-name="customAnimationIn" data-animation-duration="1750" data-animation-delay="250" style={{ willChange: 'transform, opacity', animationDuration: '1750ms' }}>Running<br />Community</h1>
  <p className="u-align-center u-text u-text-2">Image from <a href="https://www.freepik.com/photos/people" className="u-border-1 u-border-active-palette-3-light-2 u-border-hover-palette-3-light-2 u-border-no-left u-border-no-right u-border-no-top u-border-white u-btn u-button-link u-button-style u-none u-text-body-alt-color u-btn-1">Freepik</a></p>
  <a href="https://nicepage.com/website-design" className="u-active-palette-3-light-3 u-align-center u-border-none u-btn u-btn-round u-button-style u-hover-palette-3-light-3 u-radius-50 u-text-active-palette-3-base u-text-body-color u-text-hover-palette-3-base u-white u-btn-2"> Begin now from $24,00</a>
</div>


        </div>
      </div>
    </section>

  
    <h2 className="u-align-center u-text u-text-default u-text-1" data-animation-name="customAnimationIn" data-animation-duration="1750" data-animation-delay="500"> Sessions</h2>

  <section className="u-align-center u-clearfix u-container-align-center u-grey-10 u-section-2" id="carousel_371b" style={{ marginTop: '10px' }}>
    <div className="u-clearfix u-sheet u-valign-middle u-sheet-1">
      <p className="u-text u-text-default u-text-2" data-animation-name="customAnimationIn" data-animation-duration="1500" data-animation-delay="500"></p>
      <div className="u-expanded-width u-list u-list-1" style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="u-repeater u-repeater-1" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className="u-align-center u-border-15 u-border-custom-color-2 u-border-no-left u-border-no-right u-border-no-top u-container-align-center-lg u-container-align-center-md u-container-align-center-sm u-container-align-center-xs u-container-style u-custom-border u-list-item u-radius-50 u-repeater-item u-shape-round u-white u-list-item-1" data-animation-name="customAnimationIn" data-animation-duration="1750" data-animation-delay="500">
            <div className="u-container-layout u-similar-container u-valign-top u-container-layout-1">
              <img className="u-expanded-width u-image u-image-default u-image-1" src="club_sportif/images/run3.jpg" alt="" data-image-width="700" data-image-height="575" />
              <h5 className="u-align-center u-text u-text-3">BTC Training</h5>
              <p className="u-align-center u-custom-item u-text u-text-4"><span className="u-icon"></span>Running</p>
              <span className="u-align-center u-file-icon u-icon u-text-palette-3-base u-icon-2"><img src="images/481127-6e595bca.png" alt="" /></span>
            </div>
          </div>
          <div className="u-align-center u-border-15 u-border-custom-color-2 u-border-no-left u-border-no-right u-border-no-top u-container-style u-custom-border u-list-item u-radius-50 u-repeater-item u-shape-round u-white u-list-item-2" data-animation-name="customAnimationIn" data-animation-duration="1750" data-animation-delay="500">
            <div className="u-container-layout u-similar-container u-valign-top u-container-layout-2">
              <img className="u-expanded-width u-image u-image-default u-image-2" src="club_sportif/images/run2.jpg" alt="" data-image-width="700" data-image-height="575" />
              <h5 className="u-align-center u-text u-text-5">Triathlon Crew</h5>
              <p className="u-align-center u-custom-item u-text u-text-6">Triathlon</p>
              <span className="u-align-center u-file-icon u-icon u-text-palette-3-base u-icon-3"><img src="images/481127-6e595bca.png" alt="" /></span>
            </div>
          </div>
          <div className="u-align-center u-border-15 u-border-custom-color-2 u-border-no-left u-border-no-right u-border-no-top u-container-align-center u-container-style u-custom-border u-list-item u-radius-50 u-repeater-item u-shape-round u-white u-list-item-3" data-animation-name="customAnimationIn" data-animation-duration="1750" data-animation-delay="500">
            <div className="u-container-layout u-similar-container u-valign-top u-container-layout-3">
              <img className="u-expanded-width u-image u-image-default u-image-3" src="club_sportif/images/657.jpg" alt="" data-image-width="700" data-image-height="575" />
              <h5 className="u-align-center u-text u-text-7">Urban Runners</h5>
              <p className="u-align-center u-custom-item u-text u-text-8">Running</p>
              <span className="u-align-center u-file-icon u-icon u-text-palette-3-base u-icon-4"><img src="images/481127-6e595bca.png" alt="" /></span>
            </div>
          </div>
          <div className="u-align-center u-border-15 u-border-custom-color-2 u-border-no-left u-border-no-right u-border-no-top u-container-style u-custom-border u-list-item u-radius-50 u-repeater-item u-shape-round u-white u-list-item-4" data-animation-name="customAnimationIn" data-animation-duration="1750" data-animation-delay="500">
            <div className="u-container-layout u-similar-container u-valign-top u-container-layout-4">
              <img className="u-expanded-width u-image u-image-default u-image-4" src="club_sportif/images/435.jpg" alt="" data-image-width="700" data-image-height="575" />
              <h5 className="u-align-center u-text u-text-9">Center Park</h5>
              <p className="u-align-center u-custom-item u-text u-text-10">Fitness · Running</p>
              <span className="u-align-center u-file-icon u-icon u-text-palette-3-base u-icon-5"><img src="images/481127-6e595bca.png" alt="" /></span>
            </div>
          </div>
        </div>
        <h2 className="u-align-center u-text u-text-default u-text-1" data-animation-name="customAnimationIn" data-animation-duration="1750" data-animation-delay="500"> Competitions</h2>

        <div className="u-repeater u-repeater-2" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <div className="u-align-center u-border-15 u-border-custom-color-2 u-border-no-left u-border-no-right u-border-no-top u-container-style u-custom-border u-list-item u-radius-50 u-repeater-item u-shape-round u-white u-list-item-5" data-animation-name="customAnimationIn" data-animation-duration="1750" data-animation-delay="750" style={{ marginRight: '10px' }}>
            <div className="u-container-layout u-similar-container u-valign-top u-container-layout-5">
              <img className="u-expanded-width u-image u-image-default u-image-5" src="club_sportif/images/43534.jpg" alt="" data-image-width="700" data-image-height="575" />
              <h5 className="u-align-center u-text u-text-11">Weekly runs</h5>
              <p className="u-align-center u-custom-item u-text u-text-12">Fitness · Running</p>
              <span className="u-align-center u-file-icon u-icon u-text-palette-3-base u-icon-6"><img src="images/481127-6e595bca.png" alt="" /></span>
            </div>
          </div>
          <div className="u-align-center u-border-15 u-border-custom-color-2 u-border-no-left u-border-no-right u-border-no-top u-container-align-center u-container-style u-custom-border u-list-item u-radius-50 u-repeater-item u-shape-round u-white u-list-item-6" data-animation-name="customAnimationIn" data-animation-duration="1750" data-animation-delay="750" style={{ marginRight: '10px' }}>
            <div className="u-container-layout u-similar-container u-valign-top u-container-layout-6">
              <img className="u-expanded-width u-image u-image-default u-image-6" src="club_sportif/images/654e6.jpg" alt="" data-image-width="1380" data-image-height="920" />
              <h5 className="u-align-center u-text u-text-13">Nike Center</h5>
              <p className="u-align-center u-custom-item u-text u-text-14">Indoor Cycling · Running </p>
              <span className="u-align-center u-file-icon u-icon u-text-palette-3-base u-icon-7"><img src="images/481127-6e595bca.png" alt="" /></span>
            </div>
          </div>
          <div className="u-align-center u-border-15 u-border-custom-color-2 u-border-no-left u-border-no-right u-border-no-top u-container-style u-custom-border u-list-item u-radius-50 u-repeater-item u-shape-round u-white u-list-item-7" data-animation-name="customAnimationIn" data-animation-duration="1750" data-animation-delay="750" style={{ marginRight: '10px' }}>
            <div className="u-container-layout u-similar-container u-valign-top u-container-layout-7">
              <img className="u-expanded-width u-image u-image-default u-image-7" src="club_sportif/images/43.jpg" alt="" data-image-width="700" data-image-height="575" />
              <h5 className="u-align-center u-text u-text-15">Athletik Training</h5>
              <p className="u-align-center u-custom-item u-text u-text-16">Fitness · Running</p>
              <span className="u-align-center u-file-icon u-icon u-text-palette-3-base u-icon-8"><img src="images/481127-6e595bca.png" alt="" /></span>
            </div>
          </div>
          <div className="u-align-center u-border-15 u-border-custom-color-2 u-border-no-left u-border-no-right u-border-no-top u-container-style u-custom-border u-list-item u-radius-50 u-repeater-item u-shape-round u-white u-list-item-8" data-animation-name="customAnimationIn" data-animation-duration="1750" data-animation-delay="750">
            <div className="u-container-layout u-similar-container u-valign-top u-container-layout-8">
              <img className="u-expanded-width u-image u-image-default u-image-8" src="club_sportif/images/564.jpg" alt="" data-image-width="700" data-image-height="575" />
              <h5 className="u-align-center u-text u-text-17">Outdoor Training</h5>
              <p className="u-align-center u-custom-item u-text u-text-18">Bootcamp · Fitness</p>
              <span className="u-align-center u-file-icon u-icon u-text-palette-3-base u-icon-9"><img src="images/481127-6e595bca.png" alt="" /></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>




        <footer className="u-align-center u-clearfix u-footer u-grey-80 u-footer" id="sec-7ba4">
          <div className="u-clearfix u-sheet u-sheet-1">
            <p className="u-small-text u-text u-text-variant u-text-1">Exemple de texte. Cliquez pour sélectionner lélément de texte.</p>
          </div>
        </footer>

        <section className="u-backlink u-clearfix u-grey-80">
          <a className="u-link" href="https://nicepage.com/html-templates" target="_blank" rel="noopener noreferrer">
            <span>HTML Website Templates</span>
          </a>
          <p className="u-text">
            <span>created with</span>
          </p>
          <a className="u-link" href="" target="_blank" rel="noopener noreferrer">
            <span>Offline Website Builder Software</span>
          </a>. 
        </section>

      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default Home;
