<?php
namespace benf\embeddedassets;

use yii\base\Event;

use Craft;
use craft\base\Plugin as BasePlugin;
use craft\services\Assets;
use craft\web\View;
use craft\elements\Asset;
use craft\events\GetAssetThumbUrlEvent;
use craft\events\TemplateEvent;
use craft\events\SetElementTableAttributeHtmlEvent;
use craft\events\RegisterElementTableAttributesEvent;

use benf\embeddedassets\assets\Main as MainAsset;
use benf\embeddedassets\models\Settings;
use benf\embeddedassets\models\EmbeddedAsset;

class Plugin extends BasePlugin
{
	public static $plugin;

	public $hasCpSettings = true;

	public $controllerMap = [
		'actions' => Controller::class,
	];

	public function init()
	{
		parent::init();

		self::$plugin = $this;

		$requestService = Craft::$app->getRequest();

		$this->setComponents([
            'methods' => Service::class,
        ]);

		if ($requestService->getIsCpRequest())
		{
			Event::on(
				View::class,
				View::EVENT_BEFORE_RENDER_TEMPLATE,
				function(TemplateEvent $event)
				{
					$viewService = Craft::$app->getView();
					$viewService->registerAssetBundle(MainAsset::class);
				}
			);

			Event::on(
				Assets::class,
				Assets::EVENT_GET_ASSET_THUMB_URL,
				function(GetAssetThumbUrlEvent $event)
				{
					$embeddedAsset = $this->methods->getEmbeddedAsset($event->asset);
					$thumbSize = max($event->width, $event->height);
					$event->url = $embeddedAsset ? $this->_getThumbnailUrl($embeddedAsset, $thumbSize) : null;
				}
			);

			Event::on(
				Asset::class,
				Asset::EVENT_REGISTER_TABLE_ATTRIBUTES,
				function(RegisterElementTableAttributesEvent $event)
				{
					$event->tableAttributes['provider'] = ['label' => Craft::t('embeddedassets', "Provider")];
				}
			);

			Event::on(
				Asset::class,
				Asset::EVENT_SET_TABLE_ATTRIBUTE_HTML,
				function(SetElementTableAttributeHtmlEvent $event)
				{
					// Prevent new table attributes from causing server errors
					if (in_array($event->attribute, ['provider']))
					{
						$event->html = '';
					}

					$embeddedAsset = $this->methods->getEmbeddedAsset($event->sender);
					$html = $embeddedAsset ? $this->_getTableAttributeHtml($embeddedAsset, $event->attribute) : null;

					if ($html !== null)
					{
						$event->html = $html;
					}
				}
			);
		}
	}

	protected function createSettingsModel()
	{
		return new Settings();
	}

	protected function settingsHtml()
    {
		$viewService = Craft::$app->getView();

		return $viewService->renderTemplate('embeddedassets/settings', [
			'settings' => $this->getSettings(),
		]);
    }

    private function _getThumbnailUrl(EmbeddedAsset $embeddedAsset, int $size)
	{
		$assetManagerService = Craft::$app->getAssetManager();

		$url = null;
		$image = $embeddedAsset->getImageToSize($size);

		if ($image && $this->methods->isSecureUrl($image['url']))
		{
			$url = $image['url'];
		}
		// Check to avoid showing the default thumbnail or provider icon in the asset editor HUD.
		else if ($size <= 200)
		{
			$providerIcon = $embeddedAsset->getProviderIconToSize($size);
			$url = $providerIcon && $this->methods->isSecureUrl($providerIcon['url']) ? $providerIcon['url'] :
				$assetManagerService->getPublishedUrl('@benf/embeddedassets/resources/default-thumb.svg', true);
		}

		return $url;
	}

    private function _getTableAttributeHtml(EmbeddedAsset $embeddedAsset, string $attribute)
	{
		$html = null;

		switch ($attribute)
		{
			case 'provider':
			{
				if ($embeddedAsset->providerName)
				{
					$providerUrl = $embeddedAsset->providerUrl;
					$providerIcon = $embeddedAsset->getProviderIconToSize(32);
					$providerIconUrl = $providerIcon ? $providerIcon['url'] : null;
					$isProviderIconSafe = $providerIconUrl && $this->methods->isSecureUrl($providerIconUrl);

					$html = "<span class='embedded-assets_label'>";
					$html .= $isProviderIconSafe ? "<img src='$providerIconUrl' width='16' height='16'>" : '';
					$html .= $providerUrl ? "<a href='$embeddedAsset->providerUrl' target='_blank' rel='noopener'>" : '';
					$html .= $embeddedAsset->providerName;
					$html .= $providerUrl ? "</a>" : '';
					$html .= "</span>";
				}
			}
			break;
			case 'kind': $html = $embeddedAsset->type ? Craft::t('embeddedassets', ucfirst($embeddedAsset->type)) : null; break;
			case 'width': $html = $embeddedAsset->imageWidth ? $embeddedAsset->imageWidth . 'px' : null; break;
			case 'height': $html = $embeddedAsset->imageHeight ? $embeddedAsset->imageHeight . 'px' : null; break;
			case 'imageSize':
			{
				$width = $embeddedAsset->imageWidth;
				$height = $embeddedAsset->imageHeight;
				$html = $width && $height ? "$width × $height" : null;
			}
			break;
			case 'link':
			{
				if ($embeddedAsset->url)
				{
					$linkTitle = Craft::t('app', 'Visit webpage');
					$html = "<a href='$embeddedAsset->url' target='_blank' rel='noopener' data-icon='world' title='$linkTitle'></a>";
				}
			}
			break;
		}

		return $html;
	}
}
