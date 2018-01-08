<div class="site-menubar site-menubar-light">
    {{-- Site menu component --}}
   <div class="site-menubar-body">
      <div>
        <div>
         
          <ul class="site-menu" data-plugin="menu">
            <li class="site-menu-category">General</li>
            <li class="dropdown site-menu-item has-sub">
              <a data-toggle="dropdown" href="javascript:void(0)" data-dropdown-toggle="false">
                <i class="site-menu-icon wb-layout" aria-hidden="true"></i>
                <span class="site-menu-title">Servers</span>
                <span class="site-menu-arrow"></span>
              </a>
              <div class="dropdown-menu">
                <div class="site-menu-scroll-wrap is-list">
                  <div>
                    <div>
                      <ul class="site-menu-sub site-menu-normal-list">
                        <li class="site-menu-item">
                          <router-link class="animsition-link" to="/servers">
                            <span class="site-menu-title">List</span>
                          </router-link>
                        </li>
                        <li class="site-menu-item">
                         <router-link class="animsition-link" to="/categories">
                            <span class="site-menu-title">Categories</span>
                          </router-link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </li>
           
          </ul>

        </div>
      </div>
    </div> 
    {{-- End site menu component --}}  
  </div>