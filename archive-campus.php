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
                <div class="marker" data-lat="<?= $mapLocation["lat"]; ?>" data-lng="<?= $mapLocation["lng"]; ?>">
                    <h3>
                        <a href="<?php the_permalink(); ?>"></a>
                        <?php the_title(); ?>
                    </h3>
                    <?= $mapLocation["address"]; ?>
                </div>

            <?php } ?>
        </ul>
    </div>
</div>

<?php get_footer();

?>