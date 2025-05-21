  <form class="search-form" method="get" action="<?= esc_url(site_url('/')); ?>/search">
      <label class="headline headline--medium" for="s">Perform a New Search:</label>
      <div class="search-form-row">
          <input class="s" id="s" type="search" placeholder="What are you looking for?" name="s" />
          <input class="search-submit" type="submit" value="Search" />
      </div>
  </form>