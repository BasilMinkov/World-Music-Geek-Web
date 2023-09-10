def modify_dict(original_dict):

    resources = list()

    for key in ['applemusic', 'bandcamp', 'other', 'soundcloud', 'spotify', 'telegram', 'vk', 'youtube']:
        if original_dict[key] != '':
            resources.append(
                {
                    "resource": key,
                    "link": original_dict[key],
                    "icon": f"photos/{key}.svg"
                }
            )

    # Create a new dictionary to store the modified data
    modified_dict = {
        'id': original_dict['id'],
        'artist': original_dict['artist'],
        'album': original_dict['album'].strip(),
        'label': original_dict['label'],
        'year': original_dict['year'],
        'body': original_dict['body'],
        'tags': original_dict['tags'].split('|'),
        'image': original_dict['image'],
        'width': original_dict['width'],
        'height': original_dict['height'],
        'date': original_dict['date'],
        'edited': original_dict['edited'],
        'resources': resources,
        'user_id': original_dict['user_id']
    }
    return modified_dict