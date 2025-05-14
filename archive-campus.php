<?php

get_header();
pageBanner(array(
    "title" => "Our Campuses",
    "subtitle" => "We have several conveniently the located campuses."
));
?>

<div class="container container--narrow page-section">

    <div class="acf-map">
        <ul class="link-list min-list">
            <?php
            while (have_posts()) {
                the_post();
                $mapLocation = get_field("map_location")
            ?>
                <div class="marker" data-lat="<?= $mapLocation["lat"]; ?>" data-lng="<?= $mapLocation["lng"]; ?>"></div>

            <?php }
            echo paginate_links();
            ?>
        </ul>
    </div>
</div>

<?php get_footer();

?>